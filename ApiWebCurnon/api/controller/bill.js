const Bill = require('../model/bill')
const User = require('../model/user')

exports.create_bill = async (req ,res) => {
    var user = await getUser(req.body.idUser);
    Bill.create({
        user,
        priceTotal: req.body.priceTotal,
        coupon: req.body.coupon,
        couponPresent: req.body.couponPresent,
        status: req.body.status,
        pay: req.body.pay
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.update_bill = async (req, res) => {
    var bill = await getBill(req.params.id);
    bill.status = req.body.status
    console.log('bill',bill)
    await Bill.findByIdAndUpdate(req.params.id, bill, (err, result) => {
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
                    url: 'http://localhost:4000/api/menber/bill/' + result._id
                }
            });
        }
    })
}

exports.delete_bill = (req ,res) => {
    Bill.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.search_bill = (req ,res) => {
    // let search = req.body.search;
    // console.log("method search catename:" ,search)
    // Bill.find({ priceTotal : {'$regex': search} },(err,result) => {
    //     if(err) res.send(err)
    //     res.send(result)
    // })
}

exports.get_a_bill = (req ,res) => {
    console.log("id",req.params.id)
    Bill.findById(req.params.id ,(err ,result) => {
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

async function getBill(idB) {
    var kq;
    kq = Bill.findOne({_id: idB} ,(err ,result) => {
        if(err) console.log(err)
        console.log('success')
    })
    return kq;
}