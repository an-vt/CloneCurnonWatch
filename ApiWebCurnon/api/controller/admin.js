const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req ,res) => {
    console.log('add account admin')
    console.log(req.body)
    // check if username đã có trong database
    const existUsername = await User.findOne({
        username : req.body.username.trim()
    })

    if(existUsername) {
        return res.status(400).send('Username already exist')
    }

    if(req.body.username.trim().length < 6 || req.body.password.trim().length < 6) {
        return res.status(401).send('Tài khoản hoặc mật khẩu phải ít nhất 6 kí tự')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password.trim() ,salt);

    const user = new User({
        name: req.body.name,
        age: req.body.age,
        role: 'ADMIN',
        username: req.body.username,
        password: hashedPassword,
        address: req.body.address,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        avatar: req.file ? req.file.filename : ''
    })

    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }

}

exports.login = async (req ,res) => {
    //check if username đã có trong database
    const user = await User.findOne({
        username : req.body.username.trim()
    })
    console.log(user)
    if(req.body.username.trim().length < 6 || req.body.password.trim().length < 6) {
        return res.status(402).send('Tài khoản hoặc mật khẩu phải ít nhất 6 kí tự')
    }
    if(!user) {
        return res.status(400).send('Username or password wrong')
    }
    const validPass = await bcrypt.compare(req.body.password.trim() ,user.password)
    if(!validPass) return res.status(400).send('Invalid password')
    if(user.role === 'MEMBER') return res.status(401).send('Tài khoản của bạn không có quyền truy cập')

    //create token
    const token = jwt.sign({_id: user._id} ,process.env.TOKEN_SECRET)

    res.send({
        'accessToken': token
    })
}

exports.update_admin = async (req ,res) => {
    console.log(req.params.id)
    const existUsername = await User.findOne({
        username : req.body.username
    })
    console.log(existUsername)
    if(existUsername && !((existUsername._id).equals(req.params.id)) ) {
        return res.send('Username already exist')
    }
    const updateUser = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        gender: req.body.gender,
        role: req.body.role,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        avatar: req.body.avatar,
    };

    if(req.file != undefined){
        console.log('update image user')
        updateUser['avatar'] = req.file.filename;
    }
    await User.findByIdAndUpdate(req.params.id ,updateUser ,(err,result) => {
        if(err) res.send(err)  
        res.send(result)
    })
}

exports.delete_admin = (req ,res) => {
    User.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(error)
        res.send("deleted succesful !")
    })
}

exports.search_admin = async (req, res) => {
    let search = req.body.search;

    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}

    await User.countDocuments({} ,(error ,result) => {
        results.recordsTotal = result
    })

    try {
        let users = await User.find({ "name": {'$regex': search} ,"role": "ADMIN"},).limit(limit).skip(startIndex).exec()
        results.recordsFiltered = products.length
        results.data = products
        res.json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_a_admin = (req ,res) => {
    console.log("id",req.params.id)
    User.findById(req.params.id ,(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

// exports.getMe = async (req ,res) => {
//     console.log(req.user)
//     try {
//         const user = await User.findOne({ _id: req.user._id })
//         res.send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
