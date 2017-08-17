var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    if (req.url === '/') {
      utils.serveAssets(res, __dirname + '/public/index.html');
    } else if (req.url === '/loading.html') {
      utils.serveAssets(res, __dirname + '/public/loading.html');
    } else {
      utils.serveAssets(res, archive.paths.archivedSites + req.url);
    }
  }

  if (req.method === 'POST') {
    if (req.url === '/' || req.url === '/loading.html') {
      utils.gatherData(req, function(url) {
        archive.isUrlInList(url, function(listed) {
          if (!listed) {
            archive.addUrlToList(url, function() {
              utils.redirect(res, '/loading.html');
            });
          } else {
            archive.isUrlArchived(url, function(archived) {
              if (!archived) {
                utils.redirect(res, '/loading.html');
              } else {
                utils.redirect(res, '/' + url);
              }
            });
          }
        });
      });
    }
  }

};
