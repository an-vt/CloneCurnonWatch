const mongoose = require('mongoose')

const BillProductSchema = new mongoose.Schema({
    unitPrice: Number,
    quantity: Number,
    idBill: {
        type: String,
        required: true 
    },
    product: Object
})

module.exports = mongoose.model('BillProduct' ,BillProductSchema)