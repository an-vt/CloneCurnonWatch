const jwt = require('jsonwebtoken')

module.exports =  function (req ,res ,next) {
    const bearerToken = req.header('Authorization')
    if(!bearerToken) return res.status(400).send('Access deneid')
    const token = bearerToken.slice(7)
    try {
        const verified = jwt.verify(token ,process.env.TOKEN_SECRET)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}