module.exports = function (app) {
    const user = require('../controller/user')
    const verify = require('./verifyToken')
    
    app.route('/api/admin/user/search')
     .post(verify ,user.search_user)

    app.route('/api/admin/user/:id')
     .delete(verify, user.delete_user)
}