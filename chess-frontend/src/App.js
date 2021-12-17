import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';
import Loading from './components/Loading'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newGame: false,
			start_match: null
		}

		this.togglenewGame = this.togglenewGame.bind(this)
		this.begin_match = this.begin_match.bind(this)
	}

	begin_match = (game_id) => {

		localStorage.setItem("which_player", "player1")
		localStorage.setItem("game_id", game_id)

		setTimeout(()=>{this.setState({ newGame: true })}, 1500)
	}

	togglenewGame = (sender_email, reciever_email) => { //sender_email received from navbar component
		// use sender_email and receiver email to get the details of the board
		fetch(`http://localhost:5000/player_details/${reciever_email}`)
		.then(resp => resp.json())
		.then(d => {
			let all_requests = d['request']
			all_requests.forEach((req) => {
				if(req['sender'] == sender_email){
					console.log("m here")
					const game_id = uuidv4();
					let params = {
						method: "POST",
						headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
						},
						body: JSON.stringify({ 
							game_id: game_id,
							sender_email: sender_email,
							reciever_email: reciever_email,
							sender_color: req['sender_color']
						})
					}

					//create new game board
					fetch(`http://localhost:5000/game/create_board`, params)
					// tell the sender that game has been created and started
					.then(fetch(`http://localhost:5000/game/start_game/${sender_email}/${game_id}`))
					//delete the request from the db
					.then(fetch(`http://localhost:5000/game/delete_request/${sender_email}/${reciever_email}`))
					
                    

					//make this current player as player2
					localStorage.setItem("which_player", "player2")
					localStorage.setItem("game_id", game_id)
				}
			})
		})
		
		setTimeout(()=>{this.setState({ newGame: true })}, 1500)
	}

	render() {
		if(this.state.newGame)
			return (<Game />)
		else 
			return (
				<div id="App">
					<Router>
						<Routes>
							<Route exact path='/' element={<Home  begin_match={this.begin_match} togglenewGame={this.togglenewGame} />} />
							<Route exact path='/Game' element={<Game />} />
						</Routes>
					</Router>
				</div>
			);
	}
}

export default App;
