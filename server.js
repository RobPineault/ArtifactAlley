var express  = require('express');
var app      = express();
var requirejs = require('requirejs');
    app.listen(8080);
app.use(express.static('node_modules'));
app.get('/cards', function(req, res) {
       res.sendFile(__dirname + '/cards.html'); // load the single view file (angular will handle the page changes on the front-end)
   });
app.get('/draft-simulator', function(req, res) {
       res.sendFile(__dirname + '/draft-simulator.html'); // load the single view file (angular will handle the page changes on the front-end)
   });
  // app.get('/', function(req, res) {
      //    res.sendFile(__dirname + '/home.html'); // load the single view file (angular will handle the page changes on the front-end)
    //  });
   app.get('/deck-builder', function(req, res) {
          res.sendFile(__dirname + '/deck-builder.html'); // load the single view file (angular will handle the page changes on the front-end)
      });
