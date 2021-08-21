const mongoose  = require('mongoose')

const chessboardSchema = new mongoose.Schema({
     
    '1a': String, '1b': String, '1c': String, '1d': String, '1e': String, '1f': String, '1g': String, '1h': String, '2a': String, '2b': String, '2c': String, '2d': String, '2e': String, '2f': String, '2g': String, '2h': String, '3a': String, '3b': String, '3c': String, '3d': String, '3e': String, '3f': String, '3g': String, '3h': String, '4a': String, '4b': String, '4c': String, '4d': String, '4e': String, '4f': String, '4g': String, '4h': String, '5a': String, '5b': String, '5c': String, '5d': String, '5e': String, '5f': String, '5g': String, '5h': String, '6a': String, '6b': String, '6c': String, '6d': String, '6e': String, '6f': String, '6g': String, '6h': String, '7a': String, '7b': String, '7c': String, '7d': String, '7e': String, '7f': String, '7g': String, '7h': String, '8a': String, '8b': String, '8c': String, '8d': String, '8e': String, '8f': String, '8g': String, '8h': String
})

const model = mongoose.model('chessboard', chessboardSchema)

module.exports = model