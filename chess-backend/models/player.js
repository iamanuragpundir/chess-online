const mongoose  = require('mongoose')

const playerSchema = new mongoose.Schema({
    username: String,
    email: String,
    online: Boolean,
    playing: Boolean,
    games: []
})
const model = mongoose.model('player', playerSchema)
module.exports = model