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
import datetime
import pprint
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
    view_map = find_photos(args.in_dir)
    if not check_views(view_map):
        sys.exit(1)
    # pprint.pprint(view_map)

    make_fullsize(view_map, args.out_dir)
    make_thumbnails(view_map, args.out_dir)


date_re = re.compile(r'^\d\d\d\d-\d\d-\d\d$')
photo_re = re.compile(r'^(\d\d\.[\w-]+)\.jpg$')


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


def check_views(view_map):
    ok = True
    for photos in view_map.values():
        if len(photos) == 1:
            print('error: snowflake photo {}'.format(photos[0]),
                  file=sys.stderr)
            ok = False

    return ok


def make_fullsize(view_map, out_dir):
    for view in sorted(view_map):
        view_dir = os.path.join(out_dir, view)
        if not os.path.isdir(view_dir):
            os.makedirs(view_dir)
        for (_, date, in_file) in view_map[view]:
            out_file = os.path.join(view_dir, str(date) + '.jpg')
            resize_img(in_file, out_file, 1024)


def make_thumbnails(view_map, out_dir):
    thumb_dir = os.path.join(out_dir, 'thumbnails')
    if not os.path.isdir(thumb_dir):
        os.makedirs(thumb_dir)
    for view in sorted(view_map):
        out_file = os.path.join(thumb_dir, view + '.jpg')
        in_file = view_map[view][-1][-1]
        resize_img(in_file, out_file, 128)


def resize_img(in_file, out_file, new_width):
    if os.path.isfile(out_file):
        return

    print('{} → {}'.format(in_file, out_file))
    with Image.open(in_file) as in_img:
        scale = in_img.size[0] / new_width
        new_size = (new_width, int(in_img.size[1] / scale))
        in_img.resize(new_size).save(out_file)


main()
