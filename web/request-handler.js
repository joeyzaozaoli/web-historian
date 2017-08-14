var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    if (req.url === '/') {
      utils.serveAssets(res, __dirname + '/public/index.html');
    }
  }

};
