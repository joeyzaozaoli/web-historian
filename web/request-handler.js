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
    if (req.url === '/' || req.url === '/loading.html') {
      utils.gatherData(req, function(url) {
        archive.isUrlInList(url, function(listed) {
          if (!listed) {
            archive.addUrlToList(url, function() {
              // redirect to loading.html
              utils.redirect(res, '/loading.html');
            });
          } else {
            archive.isUrlArchived(url, function(archived) {
              if (!archived) {
                // redirect to loading.html
                utils.redirect(res, '/loading.html');
              } else {
                // redirect to www.url.com
                utils.redirect(res, '/' + url);
              }
            });
          }
        });
      });
    }
  }

};
