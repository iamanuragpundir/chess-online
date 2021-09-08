import React, { Component } from 'react'
import Board from  './Board'
import MessageBar from './MessageBar';
import Loading from './Loading'
import './style/Game.css';

export class Game extends Component {
    constructor(props) {
		super(props)
		this.state = { 
			pieces: [], 
			isLoaded: false, 
			src: null, 
			dest: null, 
			turnOf: "black", 
			yourAre: "blackTiles",
			messageBar: null
		}

		this.validMoveMade = this.validMoveMade.bind(this)
	}

	componentDidMount() {
		
		this.timer = setInterval(() => {
				try {
					const which_player = localStorage.getItem("which_player")   //change to session storage
					const game_id = localStorage.getItem('game_id')				//change to session storage
					const url = `http://localhost:5000/game/live_board/${game_id}/${which_player}`
		
					fetch(url).then(res => {
						// console.log(res)
						return res.json()
						
					}).then(json => {
						this.setState({
							pieces: json,
							messageBar: json["message"],
							isLoaded: true
						})
						// console.log(this.state.pieces)
						// console.log("success")
					})
				}
				catch (err) {
					console.log(err)
				}
			},
			500
		);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		// localStorage.removeItem('which_player')
		// localStorage.removeItem('game_id')
	}

	validMoveMade = (src, dest, checked, checkmated, stalemated) => {
		// change make dest tile image as src tile image and place empty image in src tile
		let src_image_url = this.state.pieces[src]
		let message = "null"
		if(checked !== null)	message = `${checked} checked!`
		if(checkmated !== null)	message = `${checkmated} checkmated !`
		
		//make a sound of the move made
		let audio = new Audio("assets/sounds/chessmove.wav");
		audio.play()
		
		this.setState(prevState => {
			let pieces = { ...prevState.pieces };
			pieces[dest] = this.state.pieces[src]
			pieces[src] = "assets/images/pieces/empty.png"
			return { pieces };
		}, ()=>{ //after making changes in the  this.state.pieces send src and dest position to server
				// so that this move can be recorded and live_board can also be updated
			const url = 'http://localhost:5000/game/movemade'
			
			let params = {
				method: "PUT",
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 
					which_player: localStorage.getItem('which_player'), 
					src:src, 
					dest: dest,
					src_image_url: src_image_url,
					game_id: localStorage.getItem('game_id'),
					messageBar: message
				})
			}
			
			fetch(url, params).then(s=>{
				console.log(s)
			})
		})
		//TODO send a request to the server to update the database with the following move
	}

	render() {

		if (!this.state.isLoaded)
			return (<Loading />);
		else
			return (
				<div id="Game">
					<div id="gameBoard">
						<MessageBar messageBar = {this.state.messageBar} />
						<Board pieces={this.state.pieces} validMoveMade={this.validMoveMade} />
					</div>
				</div>
			);
	}
}

export default Game
