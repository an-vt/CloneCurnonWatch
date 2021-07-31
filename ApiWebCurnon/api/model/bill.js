const mongoose = require('mongoose')

const BillSchema = new mongoose.Schema({
    buyDate: {
        type: Date,
        default: Date.now
    },
    priceTotal: String,
    coupon: String,
    couponPresent: String,
    status: {
        type: String,
        default: 'Chưa xử lí'
    },
    pay: {
        type: String,
        default: 'Tiền mặt'
    },
    user: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Bill' ,BillSchema)