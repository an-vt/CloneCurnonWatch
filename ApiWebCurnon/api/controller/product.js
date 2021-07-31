const Product = require('../model/product')
var Category = require('../model/category');


exports.create_product = async (req, res, next) => {
    if (req.body.idCategory == '') {
        return res.status(401).send('Bạn phải chọn danh mục sản phẩm')
    }

    const exist = await Product.findOne({
        name: req.body.name
    })
    if (exist) {
        return res.status(400).send('Name product already exist')
    }
    console.log('body', req.body)
    console.log('file', req.file)
    var category = await getCate(req.body.idCategory);
    let product = {};
    if (req.file) {
        console.log('add image product')
        product = new Product({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            image: req.file.filename,
            description: req.body.description,
            category
        })
    } else {
        console.log('no add image product')
        product = new Product({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            image: null,
            description: req.body.description,
            category
        })
    }

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    quantity: result.quantity,
                    price: result.price,
                    image: result.image,
                    category: result.category,
                    description: result.description,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/product/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.update_product = async (req, res) => {
    const product = await Product.findOne({
        name: req.body.name
    })
    if (product && !((product._id).equals(req.params.id))) {
        return res.send('Name already exist')
    }
    const updateCategory = {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    };
    var category = await getCate(req.body.idCategory);
    updateCategory['category'] = category
    if (req.file != undefined) {
        console.log('update image product')
        updateCategory['image'] = req.file.filename;
    }
    await Product.findByIdAndUpdate(req.params.id, updateCategory, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products' + result._id
                }
            });
        }
    })
}

exports.delete_product = (req, res) => {
    Product.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.search_product = async (req, res) => {
    console.log('search product')
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}

    await Product.countDocuments({} ,(error ,result) => {
        results.recordsTotal = result
    })

    try {
            let products = await Product.find({ "name": { '$regex': req.body.search.trim().toUpperCase() } }).limit(limit).skip(startIndex).exec()
            results.recordsFiltered = products.length
            results.data = products
            res.json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_a_product = async (req, res) => {
    console.log("get product")
    console.log('idP ',req.params.id)
    await Product.findById(req.params.id, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

async function getCate(idC) {
    var kq;
    await Category.find({ _id: idC }, (err, result) => {
        kq = result[0]
    })
    return kq;
}

