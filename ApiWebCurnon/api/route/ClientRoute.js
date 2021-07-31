module.exports = function (app) {
  const category = require('../controller/category');
  const product = require('../controller/product')
  const comment = require('../controller/comment')
  const file = require('../middleware/file')
  const user = require('../controller/user')
  const review = require('../controller/review')
  const coupon = require('../controller/coupon')

  //Category
  app.route('/api/category/search')
    .post(category.search_category)

  app.route('/api/category/:id')
    .get(category.get_a_category)

  // Product
  app.route('/api/product/search')
    .post(product.search_product),

    app.route('/api/product/:id')
      .get(product.get_a_product)

  //Comment

  app.route('/api/comment/count')
    .post(comment.count_get_all_by_product)

  app.route('/api/comment/search')
    .post(comment.search_comment)

  app.route('/api/comment/product')
    .post(comment.search_comment_by_product)

  app.route('/api/comment/:id')
    .get(comment.get_a_comment)

  //Review
  app.route('/api/review/search')
    .post(review.search_review)

  app.route('/api/review/:id')
    .get(review.get_a_review)

  //Coupon
  app.route('/api/coupon/search')
    .post(coupon.search_coupon);

  app.route('/api/coupon/:code')
    .get(coupon.get_a_coupon_byCode);

  //User
  app.route('/api/user/register')
    .post(file.upload.single('avatar'), user.register)
}