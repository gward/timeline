import React, { Component } from 'react';

import './App.css';
import { ThumbnailList } from './ThumbnailList';

var project = {
  'views': [
    {
      id: '01.hall',
      desc: 'hall, from top of stairs',
      thumbnail: 'thumbnails/01.hall.jpg'
    },
    {
      id: '02.to-sw',
      desc: 'towards southwest window',
      thumbnail: 'thumbnails/02.to-sw.jpg'
    },
    {
      id: '03.from-sw',
      desc: 'from southwest window',
      thumbnail: 'thumbnails/03.from-sw.jpg'
    },
  ],
  'photos': {
    '01.hall': [
      {date: '2018-10-22', path: 'photos/01.hall/2018-10-22.jpg'},
      {date: '2018-10-23', path: 'photos/01.hall/2018-10-22.jpg'},
      {date: '2018-10-24', path: 'photos/01.hall/2018-10-24.jpg'},
      {date: '2018-10-25', path: 'photos/01.hall/2018-10-25.jpg'},
      {date: '2018-10-26', path: 'photos/01.hall/2018-10-25.jpg'},
      {date: '2018-10-27', path: 'photos/01.hall/2018-10-25.jpg'},
      {date: '2018-10-28', path: 'photos/01.hall/2018-10-25.jpg'},
      {date: '2018-10-29', path: 'photos/01.hall/2018-10-29.jpg'},
    ],
    '02.to-sw': [
      {date: '2018-10-22', path: 'photos/02.to-sw/2018-10-22.jpg'},
      {date: '2018-10-23', path: 'photos/02.to-sw/2018-10-22.jpg'},
      {date: '2018-10-24', path: 'photos/02.to-sw/2018-10-24.jpg'},
      {date: '2018-10-25', path: 'photos/02.to-sw/2018-10-25.jpg'},
      {date: '2018-10-26', path: 'photos/02.to-sw/2018-10-26.jpg'},
    ],
    '03.from-sw': [
      {date: '2018-10-22', path: 'photos/03.from-sw/2018-10-22.jpg'},
      {date: '2018-10-23', path: 'photos/03.from-sw/2018-10-22.jpg'},
      {date: '2018-10-24', path: 'photos/03.from-sw/2018-10-24.jpg'},
      {date: '2018-10-25', path: 'photos/03.from-sw/2018-10-25.jpg'},
      {date: '2018-10-26', path: 'photos/03.from-sw/2018-10-26.jpg'},
      {date: '2018-10-27', path: 'photos/03.from-sw/2018-10-26.jpg'},
      {date: '2018-10-28', path: 'photos/03.from-sw/2018-10-26.jpg'},
      {date: '2018-10-29', path: 'photos/03.from-sw/2018-10-29.jpg'},
    ],
  },
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <ThumbnailList project={project} />
      </div>
    );
  }
}

export default App;
