const User = require('../controller/user')
const Bill = require('../model/bill')
const BillProduct = require('../model/billProduct')
const Product = require('../model/product')
const nodemailer = require('nodemailer');

exports.buy = async (req, res) => {
    console.log(req.body)
    try {
        const user = req.body.user;
        const bill = await addBill(req.body.user, req.body.totalFinal, req.body.coupon);
        let cart = req.body.cart;
        cart.forEach(item => {
            addBillProduct(item, bill)
        });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'truonganvu2000@gmail.com',
                pass: 'ugloqnzwxixjjylk'
            }
        });
    
        var mailOptions = {
            from: 'truonganvu2000@gmail.com',
            to: user.email,
            subject: 'Curnon Shop',
            text: 'Chúc mừng bạn đã mua hàng thành công!'
        };
    
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send(bill)
    } catch (error) {
        console.log("error ",error)
    }
}

let addBill = async (user, priceTotal, coupon) => {
    const bill = new Bill({
        user,
        priceTotal,
        coupon: coupon ? coupon.code : '',
        couponPresent: coupon ? coupon.present : '',
    })
    try {
        const savedBill = await bill.save();
        return savedBill;
    } catch (error) {
        console.log(error)
    }
}

async function addBillProduct(billP, bill) {
    const product = await getProduct(billP._id);
    console.log('product ', product)
    console.log('billP' ,billP)
    console.log('category' ,billP.category)
    const billProduct = new BillProduct({
        unitPrice: parseInt(billP.price.split('.').join('') ),
        quantity: billP.quantity,
        idBill: bill._id,
        product
    })
    try {
        const savedBillProduct = await billProduct.save();
        await updateProduct(billP)
        console.log(savedBillProduct)
    } catch (error) {
        console.log(error)
    }
}

async function getProduct(idP) {
    var kq;
    await Product.find({ _id: idP }, (err, result) => {
        kq = result[0]
    })
    return kq;
}

let updateProduct = async (billP) => {
    const product = await getProduct(billP._id);
    const category = product.category;
    // console.log(category)
    const quantityupdate = product.quantity - billP.quantity;
    await Product.findByIdAndUpdate(product._id, {
        name: product.name,
        quantity: quantityupdate,
        price: product.price,
        image: product.image,
        description: product.description,
        category
    }, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result)
        }
    })
}