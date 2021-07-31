module.exports = function (app) {
  const bill = require('../controller/bill')
  const billProduct = require('../controller/billProduct')
  const verify = require('./verifyToken')
  const comment = require('../controller/comment')
  const review = require('../controller/review')
  const user = require('../controller/user')
  const file = require('../middleware/file')
  const order = require('../controller/order')

  app.route('/api/member/bill')
    .post(verify, bill.create_bill),

    app.route('/api/member/bill/search')
      .post(verify, bill.search_bill),
    
    app.route('/api/member/bill/:id')
      .put(verify ,bill.update_bill)

    app.route('/api/member/bill/detail/:id')
      .get(verify, billProduct.get_billProduct_by_idBill),

    app.route('/api/member/bill/:id')
      .delete(verify, bill.delete_bill)
      .get(verify, bill.get_a_bill)

  app.route('/api/member/bill-product')
    .post(verify, billProduct.create_billProduct);

  app.route('/api/member/bill-product/:id')
    .delete(verify, billProduct.delete_billProduct)
    .get(verify, billProduct.get_billProduct_by_idBill)

  app.route('/api/member/comment')
    .post(verify, comment.create_comment)

  app.route('/api/member/comment/:id')
    .delete(verify, comment.delete_comment)

  app.route('/api/member/review')
    .post(verify, review.create_review)

  app.route('/api/member/review/:id')
    .delete(verify, review.delete_review)

  app.route('/api/member/user/update')
    .put(file.upload.single('avatar'), user.update_user)

  app.route('/api/member/me')
    .get(verify, user.getMe)

  app.route('/api/login')
    .post(user.login)

  app.route('/api/member/order')
    .post(verify, order.buy)
}
