const mongoose  = require('mongoose')

const gameSchema = new mongoose.Schema({
    game_id: String,
    player1: String,
    player2: String,
    turnOf: String,
    winner: String,
    default_view: String,
    moves: [{
        which_player: String,
        src: String,
        dest: String
    }],
    live_board: Object
    
})
const model = mongoose.model('game', gameSchema)

module.exports = model