var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  fs.readFile(asset, function(error, data) {
    if (error) {
      res.writeHead(404, exports.headers);
      res.end();
    } else {
      res.writeHead(200, exports.headers);
      res.end(data.toString());
    }
  });
};

exports.gatherData = function(req, callback) {
  var dataStream = '';
  req.on('data', function(chunk) {
    dataStream += chunk.toString();
  });
  req.on('end', function() {
    var url = dataStream.split('=')[1];
    callback(url);
  });
};

exports.redirect = function(res, urlPath) {
  res.writeHead(302, {Location: urlPath});
  res.end();
};
