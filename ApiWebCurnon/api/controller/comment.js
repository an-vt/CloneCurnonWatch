const Comment = require('../model/comment')
const User = require('../model/user')
const Product = require('../model/product')

exports.create_comment = async (req ,res) => {
    var user = await getUser(req.body.idUser);
    var product = await getProduct(req.body.idProduct);
    Comment.create({
        content: req.body.content,
        product,
        user
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.update_comment = async (req ,res) => {
    console.log("id ",req.params.id)
    console.log("content ",req.body.content)
    await Comment.findByIdAndUpdate(req.params.id,
        {
            content: req.body.content
        }
        ,(err,result) => {
        if(err) res.send(err)
        else {
            res.send("update succesful !")
        }  
    })
}

exports.delete_comment = (req ,res) => {
    Comment.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.search_comment = async (req ,res) => {
    let search = req.body.search;
    console.log("method search catename:" ,search)
    await Comment.find({ "content": {'$regex': search} },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.search_comment_by_product = async (req ,res) => {
    let search = req.body.search

    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}

    await Comment.countDocuments({} ,(error ,result) => {
        results.recordsTotal = result
    })

    try {
        let comments = await Comment.find({ "product.name": search }).limit(limit).skip(startIndex).exec()
        results.recordsFiltered = comments.length
        results.data = comments
        res.json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_a_comment = (req ,res) => {
    console.log("id",req.params.id)
    Comment.findById(req.params.id ,(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.count_get_all_by_product = (req ,res) => {
    let search = req.body.search
    Comment.countDocuments({'product.name': search } ,(error ,result) => {
        res.status(200).send({
            'totalRecord': result
        })
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