const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: String,
    price: String,
    image: String,
    description: String,
    category: Object
})

module.exports = mongoose.model('Product' ,ProductSchema)