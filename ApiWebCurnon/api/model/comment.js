const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    product: Object,
    user: Object,
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Comment' ,CommentSchema)