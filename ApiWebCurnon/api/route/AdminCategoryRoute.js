module.exports = function (app) {
  const category = require('../controller/category');
  const verify = require('./verifyToken')

  app.route('/api/admin/category')
    .post(verify, category.create_category);

  app.route('/api/admin/category/search')
    .post(verify ,category.search_category)

  app.route('/api/admin/category/:id')
    .get(verify ,category.get_a_category)

  app.route('/api/admin/category/:id')
    .put(verify, category.update_category)
    .delete(verify, category.delete_category);
}