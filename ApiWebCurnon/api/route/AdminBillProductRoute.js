module.exports = function (app) {
  const billProduct = require('../controller/billProduct')
  const verify = require('./verifyToken')

  app.route('/api/admin/bill-product/:id')
    .get(verify, billProduct.get_billProduct_by_idBill)
}