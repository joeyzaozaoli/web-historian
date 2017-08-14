var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');

exports.handleRequest = function (req, res) {

  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    if (req.url === '/') {
      utils.serveAssets(res, __dirname + '/public/index.html');
    } else {
      utils.serveAssets(res, __dirname + '/archives/sites' + req.url, function() {
        utils.serveAssets(res, __dirname + '/public/loading.html');
      });
    }
  }

  if (req.method === 'POST') {
    if (req.url === '/') {
      utils.gatherData(req, function(dataStream) {
        var url = dataStream.split('=')[1];
        console.log(url);
      });
    }
  }

};
