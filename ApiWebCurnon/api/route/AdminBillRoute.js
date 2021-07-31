module.exports = function (app) {
  const bill = require('../controller/bill')
  const billProduct = require('../controller/billProduct')
  const verify = require('./verifyToken')

    app.route('/api/admin/bill/search')
      .post(verify, bill.search_bill),

    app.route('/api/admin/bill/detail/:id')
      .get(verify, billProduct.get_billProduct_by_idBill),

    app.route('/api/admin/bill/:id')
      .delete(verify, bill.delete_bill)
      .get(verify, bill.get_a_bill)
}