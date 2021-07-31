module.exports = function (app) {
    const product = require('../controller/product')
    const verify = require('./verifyToken')
    const file = require('../middleware/file')

    // Product
    app.route('/api/admin/product')
        .post(verify, file.upload.single('file'), product.create_product);

    app.route('/api/admin/product/search')
        .post(verify ,product.search_product)

    app.route('/api/admin/product/:id')
        .get(verify ,product.get_a_product)

    app.route('/api/admin/product/:id')
        .put(verify, file.upload.single('file'), product.update_product)
        .delete(verify, product.delete_product);
}