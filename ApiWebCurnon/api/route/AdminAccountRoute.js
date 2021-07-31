module.exports = function (app) {
    const admin = require('../controller/admin')
    const verify = require('./verifyToken')
    const file = require('../middleware/file')

    app.route('/api/admin/account')
        .post(file.upload.single('avatar') ,admin.register);

    app.route('/api/admin/account/search')
        .post(verify, admin.search_admin);

    app.route('/api/admin/account/:id')
        .put(verify, file.upload.single('file'), admin.update_admin)
        .delete(verify, admin.delete_admin)
        .get(verify, admin.get_a_admin)

    app.route('/api/admin/login')
        .post(admin.login)
}