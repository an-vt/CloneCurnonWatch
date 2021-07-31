const Review = require('../model/review')
const User = require('../model/user')
const Product = require('../model/product')

exports.create_review = async (req ,res) => {
    var user = await getUser(req.body.idUser);
    var product = await getProduct(req.body.idProduct);
    Review.create({
        star: req.body.star,
        product,
        user
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.update_review = async (req ,res) => {
    console.log("id ",req.params.id)
    await Review.findByIdAndUpdate(req.params.id,
        {
            star: req.body.star
        }
        ,(err,result) => {
        if(err) res.send(err)
        else {
            res.send("update succesful !")
        }  
    })
}

exports.delete_review = (req ,res) => {
    Review.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.search_review = async (req ,res) => {
    let search = req.body.search;

    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}

    await Review.countDocuments({} ,(error ,result) => {
        results.recordsTotal = result
    })

    try {
        let reviews = await Review.find({ "star": {'$regex': search} }).limit(limit).skip(startIndex).exec()
        results.recordsFiltered = reviews.length
        results.data = reviews
        res.json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_a_review = (req ,res) => {
    console.log("id",req.params.id)
    Review.findById(req.params.id ,(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

async function getUser(idU) {
    var kq;
    await User.find({_id: idU} ,(err ,result) => {
        kq = result[0]
    })
    return kq;
}

async function getProduct(idP) {
    var kq;
    await Product.find({_id: idP} ,(err ,result) => {
        kq = result[0]
    })
    return kq;
}