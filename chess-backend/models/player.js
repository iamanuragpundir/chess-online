const mongoose  = require('mongoose')

const playerSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    status: String, // available, offline, busy
    games: [],
    request: [Object],
    start_match: String
})
const model = mongoose.model('player', playerSchema)
module.exports = model