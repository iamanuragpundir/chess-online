import React, {Component} from 'react';
import './App.css';
import Board from './components/Board';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pieces: [], isLoaded: false,turnOf: "black", yourAre: "blackTiles"}

    this.validMoveMade = this.validMoveMade.bind(this)
  }

  componentDidMount(){

    try{
      fetch("http://localhost:3000/chessboard").then(res => res.json()).then( json =>{
        this.setState({
            isLoaded: true,
            pieces: json
        })

        console.log("success")
      })  
    }
    catch(err){
      console.log(err)
    }
    
  }

  validMoveMade = (src, dest) => {
    // change make dest tile image as src tile image and place empty image in src tile
    //updating this

    this.setState(prevState => {
		let pieces = { ...prevState.pieces };  
		pieces[dest] = this.state.pieces[src]
		pieces[src] = "assets/images/pieces/empty.png"
		return { pieces }; 
    })

    //TODO send a request to the server to update the database with the following move
  }

  render() {

    if(!this.state.isLoaded)
        return (<div>Loading, Please Wait  ...</div>);
    else
        return (
        <div id="App">
          <Board pieces={this.state.pieces} validMoveMade = {this.validMoveMade}/>
       </div>
    );
  }
}

export default App;
