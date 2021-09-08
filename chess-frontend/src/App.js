import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';
import Loading from './components/Loading'

export class App extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			pieces: [], 
			isLoaded: false, 
			src: null, 
			dest: null, 
			turnOf: "black", 
			yourAre: "blackTiles",
			messageBar: "",
			newGame: false
		}
	}

	componentDidMount() {

		try {
			const url = `http://localhost:5000/game/live_board/game123/player1`

			fetch(url).then(res => {
				// console.log(res)
				return res.json()
				
			}).then(json => {
				this.setState({
					pieces: json,
					messageBar: json["message"],
					isLoaded: true,
				})
			})
		}
		catch (err) {
			console.log(err)
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		// localStorage.removeItem('which_player')
		// localStorage.removeItem('game_id')
	}

	render() {
		if(this.state.isLoaded)
			return(
				<Router>
					<div id="App" >
						<Route exact path='/' component={ ()=> <Home pieces={this.state.pieces}/>}></Route>
						<Route exact path='/Game' component={ ()=> <Game pieces={this.state.pieces} />}></Route>
					</div>
				</Router>
			)
		else
			return(
				<Loading />
			)
	}
}

export default App;
