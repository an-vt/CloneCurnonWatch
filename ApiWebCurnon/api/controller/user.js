const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')   

exports.register = async (req ,res) => {
    console.log('add user')
    //check if username đã có trong database
    console.log('body' ,req.body)
    console.log('file' ,req.file)
    const existUsername = await User.findOne({
        username : req.body.username
    })

    if(existUsername) {
        return res.send('Username already exist')  
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password ,salt);

    const user = new User({
        name: req.body.name,
        age: req.body.age,
        role: 'MEMBER',
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
        res.send("Đăng kí thất bại")
    }

}

exports.login = async (req ,res) => {
    console.log('login')
    //check if username đã có trong database
    const user = await User.findOne({
        username : req.body.username.trim()
    })
    if(!user) {
        return res.status(401).send('Username or password wrong')
    }
    if(!user.enabled) {
        return res.status(400).send('Tài khoản của bạn bị vô hiệu hóa')
    }
    const validPass = await bcrypt.compare(req.body.password.trim() ,user.password)
    if(!validPass) return res.status(401).send('Username or password wrong')

    //create token
    const token = jwt.sign({_id: user._id} ,process.env.TOKEN_SECRET)

    res.send({
        'accessToken': token
    })
}

exports.update_user = async (req ,res) => {
    console.log('update user' ,req.body)
    const existUsername = await User.findOne({
        username : req.body.username
    })

    if(existUsername && !((existUsername._id).equals(req.params.id)) ){
        return res.send('Username already exist')
    }
    const updateUser = {
        name: req.body.name,
        age: req.body.age,
        enabled: req.body.enabled,
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
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
        res.send("update succesful !")
    })
}

exports.delete_user = (req ,res) => {
    User.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(error)
        res.send("deleted succesful !")
    })
}

exports.search_user = async (req, res) => {
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
        let users = await User.find({ "name": {'$regex': search} ,"role": "MEMBER"}).limit(limit).skip(startIndex).exec()
        results.recordsFiltered = users.length
        results.data = users
        res.json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_a_user = (req ,res) => {
    console.log("id",req.params.id)
    User.findById(req.params.id ,(err ,result) => { 
        if(err) res.send(err)
        res.send(result)
    })
}

exports.getMe = async (req ,res) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}
