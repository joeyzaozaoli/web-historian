var fs = require('fs');
var path = require('path');
var request = require('request');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(error, data) {
    if (!error) {
      var urlArr = data.toString().split('\n');
      callback(urlArr);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urlArr) {
    if (urlArr.includes(url)) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(error) {
    if (!error) { callback(); }
  });
};

exports.isUrlArchived = function(url, callback) {
  if (fs.existsSync(exports.paths.archivedSites + '/' + url)) {
    callback(true);
  } else {
    callback(false);
  }
};

exports.downloadUrls = function(urls) {
  _.each(urls, function(url) {
    exports.isUrlArchived(url, function(archived) {
      if (!archived) {
        request('http://' + url, function(error, data) {
          if (!error) {
            fs.writeFile(exports.paths.archivedSites + '/' + url, data.body);
          }
        });
      }
    });
  });
};
