var superstatic = require('superstatic').server;

var options = {
  gzip: true
};
var app = superstatic(options);

var server = app.listen(function () {

});
