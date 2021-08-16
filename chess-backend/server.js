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
const chessModel = require('./models/pieces_position')
const path = require('path');
const { resolve } = require('path');

const app = express();
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`server is running on port: ${port}`)
})

mongoose.connect('mongodb://localhost:27017/chess', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once("open", function() {
	console.log("MongoDB database connection established successfully");
});

// function invertPieces(pieces){
// 	return new Promise( (resolve, reject)=>{

// 		const haxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
// 		const vaxis = ['1', '2', '3', '4', '5', '6', '7', '8']

// 		for (let i = 0; i < 4; i++) {
// 			let invertedVIndex = (8 - parseInt(vaxis[i]) + 1).toString();
// 			for (let j = 0; j < 8; j++) {
// 			  // let invertedHIndex = String.fromCharCode(96 + 8  - (haxis[j].charCodeAt() - 96) + 1)
// 			  let tempImgUrl = pieces[vaxis[i] + haxis[j]];
// 			  pieces[vaxis[i] + haxis[j]] = pieces[invertedVIndex + haxis[j]];
// 			  pieces[invertedVIndex + haxis[j]] = tempImgUrl;
// 			}
// 		  }
		
// 		if(pieces === undefined)
// 			reject("not resolved")
// 		else
// 			resolve(pieces)
// 	})
// }

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
		let invertedHIndex = String.fromCharCode(
			96 + 8 - (haxis[j].charCodeAt() - 96) + 1
		);
		let tempImgUrl = pieces[vaxis[i] + invertedHIndex];
		pieces[vaxis[i] + invertedHIndex] = pieces[vaxis[i] + haxis[j]];
		pieces[vaxis[i] + haxis[j]] = tempImgUrl;
		}
	}

	callback(res, pieces)
}
// app.get('/', function (req, res) {
//     res.sendFile("E:/Projects/chess-online/chess-backend/build/index.html")
//   })

function sendBoard(res, pieces){
	res.send(pieces)
}
app.use(express.static(path.normalize('../chess-frontend/build')));

app.get('/chessboard', (req, res) =>{
	// chessModel.find({}).exec().then((result) => {res.send(result[0])})
	chessModel.find({}).exec().then(result=> {
		 invertBoard(result[0], res, sendBoard)
	})
})
