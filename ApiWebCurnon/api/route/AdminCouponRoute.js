module.exports = function (app) {
  const coupon = require('../controller/coupon')
  const verify = require('./verifyToken')

  // Coupon
  app.route('/api/admin/coupon')
    .post(verify, coupon.create_coupon);

  app.route('/api/admin/coupon/search')
    .post(verify, coupon.search_coupon);

  app.route('/api/admin/coupon/:id')
    .get(verify ,coupon.get_a_coupon_byId)
    .put(verify, coupon.update_coupon)
    .delete(verify, coupon.delete_coupon),

  app.route('/api/admin/coupon/:code')
    .get(verify, coupon.get_a_coupon_byCode);
}