const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    expiredDate: {
        type: Date,
        default: Date.now()
    },
    present: Number
})

module.exports = mongoose.model('Coupon' ,CouponSchema)