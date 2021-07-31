module.exports = function (app) {
  const comment = require('../controller/comment')
  const verify = require('./verifyToken')

  app.route('/api/admin/comment/search')
    .post(verify ,comment.search_comment)

  app.route('/api/admin/comment/:id')
    .delete(verify, comment.delete_comment)
    .get(verify, comment.get_a_comment)
}