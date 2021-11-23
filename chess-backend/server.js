// const pieces = {
// 	'1a': "assets/images/pieces/rookW.png", '1b': "assets/images/pieces/knightW.png", '1c': "assets/images/pieces/bishopW.png", '1d': "assets/images/pieces/queenW.png", '1e': "assets/images/pieces/kingW.png", '1f': "assets/images/pieces/bishopW.png", '1g': "assets/images/pieces/knightW.png", '1h': "assets/images/pieces/rookW.png",

// 	'2a': "assets/images/pieces/pawnW.png", '2b': "assets/images/pieces/pawnW.png", '2c': "assets/images/pieces/pawnW.png", '2d': "assets/images/pieces/pawnW.png", '2e': "assets/images/pieces/pawnW.png", '2f': "assets/images/pieces/pawnW.png", '2g': "assets/images/pieces/pawnW.png", '2h': "assets/images/pieces/pawnW.png",

// 	'3a': "assets/images/pieces/empty.png", '3b': "assets/images/pieces/empty.png", '3c': "assets/images/pieces/empty.png", '3d': "assets/images/pieces/empty.png", '3e': "assets/images/pieces/empty.png", '3f': "assets/images/pieces/empty.png", '3g': "assets/images/pieces/empty.png", '3h': "assets/images/pieces/empty.png",

// 	'4a': "assets/images/pieces/empty.png", '4b': "assets/images/pieces/empty.png", '4c': "assets/images/pieces/empty.png", '4d': "assets/images/pieces/empty.png", '4e': "assets/images/pieces/empty.png", '4f': "assets/images/pieces/empty.png", '4g': "assets/images/pieces/empty.png", '4h': "assets/images/pieces/empty.png",

// 	'5a': "assets/images/pieces/empty.png", '5b': "assets/images/pieces/empty.png", '5c': "assets/images/pieces/empty.png", '5d': "assets/images/pieces/empty.png", '5e': "assets/images/pieces/empty.png", '5f': "assets/images/pieces/empty.png", '5g': "assets/images/pieces/empty.png", '5h': "assets/images/pieces/empty.png",

// 	'6a': "assets/images/pieces/empty.png", '6b': "assets/images/pieces/empty.png", '6c': "assets/images/pieces/empty.png", '6d': "assets/images/pieces/empty.png", '6e': "assets/images/pieces/empty.png", '6f': "assets/images/pieces/empty.png", '6g': "assets/images/pieces/empty.png", '6h': "assets/images/pieces/empty.png",

// 	'7a': "assets/images/pieces/pawnB.png", '7b': "assets/images/pieces/pawnB.png", '7c': "assets/images/pieces/pawnB.png", '7d': "assets/images/pieces/pawnB.png", '7e': "assets/images/pieces/pawnB.png", '7f': "assets/images/pieces/pawnB.png", '7g': "assets/images/pieces/pawnB.png", '7h': "assets/images/pieces/pawnB.png",

// 	'8a': "assets/images/pieces/rookB.png", '8b': "assets/images/pieces/knightB.png", '8c': "assets/images/pieces/bishopB.png", '8d': "assets/images/pieces/queenB.png", '8e': "assets/images/pieces/kingB.png", '8f': "assets/images/pieces/bishopB.png", '8g': "assets/images/pieces/knightB.png", '8h': "assets/images/pieces/rookB.png"
// }


const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const game = require('./models/game')
const player = require('./models/player')
const board = require('./models/board')
const path = require('path');
const bodyParser = require('body-parser')
const { resolve } = require('path');

const app = express();
const port = process.env.PORT || 5000
var jsonParser = bodyParser.json()

mongoose.connect('mongodb://localhost:27017/chess', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once("open", function() {
	console.log("MongoDB database connection established successfully");
});

function invertBoard(pieces, res, callback){
	const haxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
	const vaxis = ['1', '2', '3', '4', '5', '6', '7', '8']

		//row-wise inversion
	for (let i = 0; i < 4; i++) {
		let invertedVIndex = (8 - parseInt(vaxis[i]) + 1).toString();
		for (let j = 0; j < 8; j++) {
		// let invertedHIndex = String.fromCharCode(96 + 8  - (haxis[j].charCodeAt() - 96) + 1)
		let tempImgUrl = pieces[vaxis[i] + haxis[j]];
		pieces[vaxis[i] + haxis[j]] = pieces[invertedVIndex + haxis[j]];
		pieces[invertedVIndex + haxis[j]] = tempImgUrl;
		}
	}
	//column-wise inversion
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 4; j++) {
		let invertedHIndex = String.fromCharCode(96 + 8 - (haxis[j].charCodeAt() - 96) + 1);
		let tempImgUrl = pieces[vaxis[i] + invertedHIndex];
		pieces[vaxis[i] + invertedHIndex] = pieces[vaxis[i] + haxis[j]];
		pieces[vaxis[i] + haxis[j]] = tempImgUrl;
		}
	}

	callback(res, pieces)
}


function sendBoard(res, pieces){
	res.send(pieces)
}
app.use(cors())
// app.use('/', express.static(path.normalize('../chess-frontend/build')));

app.post('/newuser', jsonParser, (req, res) => {
	//check if the player that logged in currently exists or not
	player.find({email: req.body.email}).countDocuments(function (err, count) {
		if (err) console.log(err)
		else if(count === 0){
			player.create({...req.body, username: req.body.email.split('@')[0]})
		}
	})

	// also mark the person as available
	player.updateOne({email: req.body.email}, {$set: {status: "available"}},function(err, res) {
	})
})

app.put('/toggleStatus' , jsonParser, (req, res) => {
	// change the status to offline on logging out
	console.log(req.body.email)
	player.updateOne({email: req.body.email}, {$set: {status: req.body.status}},function(err, res) {
	})
})

app.get('/game/live_board/:game_id/:which_player', (req, res) =>{

	if(req.params.which_player == "player1")
		game.find({game_id: req.params.game_id}).exec().then((result) => {res.send(result[0].live_board)})
		
	else if(req.params.which_player == "player2")
		game.find({game_id: req.params.game_id}).exec().then(result=> {
			invertBoard(result[0].live_board, res, sendBoard)
		})
})


app.put('/game/movemade', jsonParser, (req, res) =>{
	// console.log(req.body.which_player, req.body.src, req.body.dest, req.body.game_id)

	let invertedVIndexSrc = (8 - parseInt(req.body.src[0]) + 1).toString();
	let invertedVIndexDest = (8 - parseInt(req.body.dest[0]) + 1).toString();
	let invertedHIndexSrc = String.fromCharCode(96 + 8 - (req.body.src[1].charCodeAt() - 96) + 1);
	let invertedHIndexDest = String.fromCharCode(96 + 8 - (req.body.dest[1].charCodeAt() - 96) + 1);

	let corrected_src = req.body.src
	let corrected_dest = req.body.dest

	if(req.body.which_player === "player2"){
		corrected_src = invertedVIndexSrc + invertedHIndexSrc
		corrected_dest = invertedVIndexDest + invertedHIndexDest
	}

	game.updateOne({game_id: req.body.game_id}, {$push: {moves: {which_player: req.body.which_player, src: corrected_src, dest: corrected_dest}}},function(err, res) {
		// Updated at most one doc, `res.modifiedCount` contains the number
		// of docs that MongoDB updated
	})

	live_board_update = {}
	live_board_update['live_board.' + corrected_dest] = req.body.src_image_url
	live_board_update['live_board.' + corrected_src] = 'assets/images/pieces/empty.png'
	live_board_update['live_board.message'] = req.body.messageBar

	game.updateMany({game_id: req.body.game_id}, {$set: live_board_update},
	function(err, res){
	})
		

	res.send("ok")
})

app.get('/player_details/:email_id', (req, res) => {
	player.findOne({email: req.params.email_id}).exec().then(result => {
		console.log(req.params.email_id)
		res.send(result)
	})
})

app.put('/send_request', jsonParser, (req, res) => {
	player.updateOne({email: req.body.req_to}, {$push: {request: req.body}}, 
		function(err, result){})
})

app.listen(port, () => {
	console.log(`server is running on port: ${port}`)
})