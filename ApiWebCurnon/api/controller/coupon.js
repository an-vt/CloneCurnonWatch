const Coupon = require('../model/coupon')

exports.create_coupon = async (req ,res) => {
    const exist = await Coupon.findOne({
        code : req.body.code
    })
    if(exist) {
        return res.send('Code already exist')
    }
    Coupon.create({
        code: req.body.code,
        present: req.body.present
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.update_coupon = async (req ,res) => {
    console.log(req.body)
    const exist = await Coupon.findOne({
        code : req.body.code
    })
    console.log(exist)
    if(exist && !((exist._id).equals(req.params.id)) ) {
        return res.send('Coupon đã tồn tại')
    }
    Coupon.findByIdAndUpdate(req.params.id,{
        code: req.body.code,
        present: req.body.present
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.delete_coupon = (req ,res) => {
    Coupon.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(err)
        res.status(200).send('Delete successful')
    })
}

exports.search_coupon = async (req ,res) => {
    let search = req.body.search;

    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}

    await Coupon.countDocuments({} ,(error ,result) => {
        results.recordsTotal = result
    })

    try {
        let coupons = await Coupon.find({ "code": {'$regex': search} }).limit(limit).skip(startIndex).exec()
        results.recordsFiltered = coupons.length
        results.data = coupons
        res.json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_a_coupon_byId = (req ,res) => {
    Coupon.findById(req.params.id ,(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.get_a_coupon_byCode = (req ,res) => {
    console.log('get coupon')
    Coupon.findOne({ code: req.params.code.trim() } ,(err,result) => {
        if(result) {
            if(err) send(err)
            res.send(result)
        }else {
            res.status(400).send('không tìm thấy')
        }
        
    })
}
