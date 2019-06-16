import {Component} from 'react';
import * as React from 'react';
import Board from './board/Board'

class App extends Component {
  render() {
    return (
        <div>
            <Board width={30}
                   height={16}
                   />
        </div>
    );
  }
}

export default App;