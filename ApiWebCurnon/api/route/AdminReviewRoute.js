module.exports = function (app) {
  const review = require('../controller/review')
  const verify = require('./verifyToken')

  app.route('/api/admin/review/search')
    .post(verify ,review.search_review)

  app.route('/api/admin/review/:id')
    .delete(verify, review.delete_review)
    .get(verify, review.get_a_review)
}