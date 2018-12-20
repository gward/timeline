import React, { Component } from 'react';

import './App.css';
import { ThumbnailList } from './ThumbnailList';

var project = {
  'views': {
    '01.hall': 'hall, from top of stairs',
    '02.to-sw': 'towards southwest window',
    '03.from-sw': 'from southwest window',
  },
  'photos': {
    '01.hall': [
      {delay: 0, date: '2018-10-22', path: '01.hall/2018-10-22.jpg'},
      {delay: 2, date: '2018-10-24', path: '01.hall/2018-10-24.jpg'},
      {delay: 1, date: '2018-10-25', path: '01.hall/2018-10-25.jpg'},
      {delay: 4, date: '2018-10-29', path: '01.hall/2018-10-29.jpg'},
    ],
    '02.to-sw': [
      {delay: 0, date: '2018-10-22', path: '02.to-sw/2018-10-22.jpg'},
      {delay: 2, date: '2018-10-24', path: '02.to-sw/2018-10-24.jpg'},
      {delay: 1, date: '2018-10-25', path: '02.to-sw/2018-10-25.jpg'},
      {delay: 1, date: '2018-10-26', path: '02.to-sw/2018-10-26.jpg'},
    ],
    '03.from-sw': [
      {delay: 0, date: '2018-10-22', path: '03.from-sw/2018-10-22.jpg'},
      {delay: 2, date: '2018-10-24', path: '03.from-sw/2018-10-24.jpg'},
      {delay: 1, date: '2018-10-25', path: '03.from-sw/2018-10-25.jpg'},
      {delay: 1, date: '2018-10-26', path: '03.from-sw/2018-10-26.jpg'},
      {delay: 3, date: '2018-10-29', path: '03.from-sw/2018-10-29.jpg'},
    ],
  },
  'thumbnails': {
    '01.hall': 'thumbnails/01.hall.jpg',
    '02.to-sw': 'thumbnails/02.to-sw.jpg',
    '03.from-sw': 'thumbnails/03.from-sw.jpg',
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
