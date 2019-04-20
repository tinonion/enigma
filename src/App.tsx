import {Component} from 'react';
import * as React from 'react';
import './App.css';
import Board from './board/Board';

class App extends Component {
  render() {
    return (
        <div>
            <Board
                height={16}
                width={30}
                spritePath="../sprites/board/"/>
        </div>
    );
  }
}

export default App;