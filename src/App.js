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
      [0, '2018-10-22', '01.hall/2018-10-22.jpg'],
      [2, '2018-10-24', '01.hall/2018-10-24.jpg'],
      [1, '2018-10-25', '01.hall/2018-10-25.jpg'],
      [4, '2018-10-29', '01.hall/2018-10-29.jpg'],
    ],
    '02.to-sw': [
      [0, '2018-10-22', '02.to-sw/2018-10-22.jpg'],
      [2, '2018-10-24', '02.to-sw/2018-10-24.jpg'],
      [1, '2018-10-25', '02.to-sw/2018-10-25.jpg'],
      [1, '2018-10-26', '02.to-sw/2018-10-26.jpg'],
    ],
    '03.from-sw': [
      [0, '2018-10-22', '03.from-sw/2018-10-22.jpg'],
      [2, '2018-10-24', '03.from-sw/2018-10-24.jpg'],
      [1, '2018-10-25', '03.from-sw/2018-10-25.jpg'],
      [1, '2018-10-26', '03.from-sw/2018-10-26.jpg'],
      [3, '2018-10-29', '03.from-sw/2018-10-29.jpg'],
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
