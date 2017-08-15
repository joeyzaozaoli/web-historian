var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(urlArr) {
  archive.downloadUrls(urlArr);
});
