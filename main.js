var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var requirejs = require('requirejs');
//var priceRequest = require('./price-request');

var app = express();

app.use(cookieParser());
app.use(logger('combined'));

app.use(express.static('public'));
app.use(express.static('public/ftp',{ extensions: ['html', 'htm'] }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
