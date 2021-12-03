import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';
import Loading from './components/Loading'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

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

		this.togglenewGame = this.togglenewGame.bind(this)
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
					isLoaded: true
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

	togglenewGame = (opponent_email) => { //sender_email received from navbar component
		//TODO use sender_email and 
		//TODO send a api-req for creating new board acc to req 
		//TODO live_board will be updated accordingly
		this.setState({ newGame: true })
	}

	render() {
		if(this.state.newGame)
			return (<Game pieces={this.state.pieces}/>)
		else if (this.state.isLoaded)
			return (
				<div id="App">
					<Router>
						<Routes>
							<Route exact path='/' element={<Home pieces={this.state.pieces} togglenewGame={this.togglenewGame} />} />
							<Route exact path='/Game' element={<Game pieces={this.state.pieces} />} />
						</Routes>
					</Router>
				</div>
			);
		else 
			return (<Loading />)
	}
}

export default App;
