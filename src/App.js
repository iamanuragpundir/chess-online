import React, {Component} from 'react';
import './App.css';
import Board from './components/Board';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces : {
        '1a': "assets/images/pieces/rookW.png",'1b': "assets/images/pieces/knightW.png",'1c': "assets/images/pieces/bishopW.png",'1d': "assets/images/pieces/queenW.png",'1e': "assets/images/pieces/kingW.png",'1f': "assets/images/pieces/bishopW.png",'1g': "assets/images/pieces/knightW.png",'1h': "assets/images/pieces/rookW.png",

        '2a': "assets/images/pieces/pawnW.png",'2b': "assets/images/pieces/pawnW.png",'2c': "assets/images/pieces/pawnW.png",'2d': "assets/images/pieces/pawnW.png",'2e': "assets/images/pieces/pawnW.png",'2f': "assets/images/pieces/pawnW.png",'2g': "assets/images/pieces/pawnW.png",'2h': "assets/images/pieces/pawnW.png",

        '3a': null,'3b': null,'3c': null,'3d': null,'3e': null,'3f': null,'3g': null,'3h': null,
        
        '4a': null,'4b': null,'4c': null,'4d': null,'4e': null,'4f': null,'4g': null,'4h': null,
        
        '5a': null,'5b': null,'5c': null,'5d': null,'5e': null,'5f': null,'5g': null,'5h': null,
        
        '6a': null,'6b': null,'6c': null,'6d': null,'6e': null,'6f': null,'6g': null,'6h': null,
        
        '7a': "assets/images/pieces/pawnB.png",'7b': "assets/images/pieces/pawnB.png",'7c': "assets/images/pieces/pawnB.png",'7d': "assets/images/pieces/pawnB.png",'7e': "assets/images/pieces/pawnB.png",'7f': "assets/images/pieces/pawnB.png",'7g': "assets/images/pieces/pawnB.png",'7h': "assets/images/pieces/pawnB.png",

        '8a': "assets/images/pieces/rookB.png",'8b': "assets/images/pieces/knightB.png",'8c': "assets/images/pieces/bishopB.png",'8d': "assets/images/pieces/queenB.png",'8e': "assets/images/pieces/kingB.png",'8f': "assets/images/pieces/bishopB.png",'8g': "assets/images/pieces/knightB.png",'8h': "assets/images/pieces/rookB.png"
      },
      isToggleOn: true
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }), ()=> {
      if (this.state.isToggleOn)this.state.pieces['1a'] = null
      else  this.state.pieces['1a'] = "assets/images/pieces/pawnW.png"
    });
  }

  render() {
    return (
        <div id="App">
          <Board pieces={this.state.pieces}/>
          <button onClick={this.handleClick}>
            Click to change the 1st image
          </button>
        </div>
    );
  }
}

export default App;
