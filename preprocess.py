#!venv/bin/python

"""ingest a bunch of photos so timeline can show 'em

* determine list of views
* determine available dates for each view
* apply rotations as necessary
* scale big photos down to "full" size (for browser, that is)
* scale all photos down to thumbnail size
* write a JSON file to drive the UI
"""

import sys
import os
import argparse
import collections
import datetime
import json
import re

from PIL import Image


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('in_dir')
    parser.add_argument('out_dir')
    args = parser.parse_args()

    # map view id to list of photos of that view, where each
    # photo is a pair (delta, date, filename). example:
    #   {
    #       '05.to-se': [
    #           (0, date(2018, 10, 22), '<indir>/2018-10-22/05.to-se.jpg'),
    #           (2, date(2018, 10, 24), '<indir>/2018-10-24/05.to-se.jpg'),
    #           (1, date(2018, 10, 25), '<indir>/2018-10-25/05.to-se.jpg'),
    #           (1, date(2018, 10, 26), '<indir>/2018-10-26/05.to-se.jpg'),
    #           (3, date(2018, 10, 29), '<indir>/2018-10-29/05.to-se.jpg'),
    #           ...
    #       ],
    #   }
    description_map = read_descriptions(args.in_dir)
    view_map = find_photos(args.in_dir)
    if not check_descriptions(description_map, view_map):
        sys.exit(1)
    if not check_views(view_map):
        sys.exit(1)
    # pprint.pprint(view_map)

    photo_map = make_fullsize(view_map, args.out_dir)
    thumbnail_map = make_thumbnails(view_map, args.out_dir)
    emit_data(
        args.out_dir, description_map, view_map, photo_map, thumbnail_map)


date_re = re.compile(r'^\d\d\d\d-\d\d-\d\d$')
photo_re = re.compile(r'^(\d\d\.[\w-]+)\.jpg$')


def read_descriptions(in_dir):
    result = {}                 # map view_id to description
    with open(os.path.join(in_dir, 'views.txt')) as in_file:
        for line in in_file:
            (view_id, desc) = line.strip().split(None, 1)
            result[view_id] = desc
    return result


def find_photos(in_dir):
    view_map = dict()
    pjoin = os.path.join
    for name in sorted(os.listdir(in_dir)):
        if not date_re.match(name):
            continue
        date_dir = pjoin(in_dir, name)
        if not os.path.isdir(date_dir):
            continue
        date = datetime.datetime.strptime(name, '%Y-%m-%d').date()

        for name in os.listdir(date_dir):
            match = photo_re.match(name)
            if not match:
                continue
            view_id = match.group(1)
            path = os.path.join(date_dir, name)
            if view_id in view_map:
                prev = view_map[view_id][-1]
                prev_date = prev[1]
                delta = (date - prev_date).days
                view_map[view_id].append((delta, date, path))
            else:
                view_map[view_id] = [(0, date, path)]

    return view_map


def check_descriptions(description_map, view_map):
    descriptions = set(description_map)
    views = set(view_map)
    if descriptions == views:
        return True

    missing_photos = descriptions - views
    missing_desc = views - descriptions
    assert missing_photos or missing_desc
    if missing_photos:
        print('error: views with no photos: {}'.format(
            ', '.join(sorted(missing_photos))))
    if missing_desc:
        print('error: views with no description: {}'.format(
            ', '.join(sorted(missing_desc))))
    return False


def check_views(view_map):
    ok = True
    for photos in view_map.values():
        if len(photos) == 1:
            print('error: snowflake photo {}'.format(photos[0]),
                  file=sys.stderr)
            ok = False

    return ok


def make_fullsize(view_map, out_dir):
    """return mapping from (view_id, date) to relative path"""
    assert not out_dir.endswith('/')
    chop_len = len(out_dir) + 1
    photo_map = collections.defaultdict(list)
    photo_dir = os.path.join(out_dir, 'photos')
    for view_id in sorted(view_map):
        for (_, date, in_file) in view_map[view_id]:
            photo_file = os.path.join(photo_dir, view_id, str(date) + '.jpg')
            photo_map[view_id].append(
                {'date': str(date), 'path': photo_file[chop_len:]})
            resize_img(in_file, photo_file, 1024)
    return dict(photo_map)


def make_thumbnails(view_map, out_dir):
    """return mapping from view_id to relative path"""
    chop_len = len(out_dir) + 1
    thumbnail_map = {}
    thumb_dir = os.path.join(out_dir, 'thumbnails')
    for view_id in sorted(view_map):
        out_file = os.path.join(thumb_dir, view_id + '.jpg')
        in_file = view_map[view_id][-1][-1]
        resize_img(in_file, out_file, 128)
        thumbnail_map[view_id] = out_file[chop_len:]
    return thumbnail_map


def resize_img(in_file, out_file, new_width):
    if os.path.isfile(out_file):
        return
    dirname = os.path.dirname(out_file)
    if not os.path.isdir(dirname):
        os.makedirs(dirname)

    print('{} → {}'.format(in_file, out_file))
    with Image.open(in_file) as in_img:
        scale = in_img.size[0] / new_width
        new_size = (new_width, int(in_img.size[1] / scale))
        in_img.resize(new_size).save(out_file)


def emit_data(out_dir, description_map, view_map, photo_map, thumbnail_map):
    views = []                  # list of view dicts
    for view_id in sorted(view_map):
        views.append({
            'id': view_id,
            'desc': description_map[view_id],
            'thumbnail': thumbnail_map[view_id],
            'photos': photo_map[view_id],
        })

    result = {'views': views}
    with open(os.path.join(out_dir, 'project.json'), 'w') as json_file:
        json.dump(result, json_file, indent=2)


main()
