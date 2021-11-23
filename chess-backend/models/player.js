const mongoose  = require('mongoose')

const playerSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    status: String,
    games: [],
    request: [Object]
})
const model = mongoose.model('player', playerSchema)
module.exports = model