module.exports = function (app) {
    const file = require('../middleware/file')

    // download file
  app.route('/api/download/:image')
  .get(file.download)
}