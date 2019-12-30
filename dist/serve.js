var express = require('express');
var ecstatic = require('ecstatic');
var app = express();
app.use(ecstatic({root: `${__dirname}/`}));

var http = require('http');
http.createServer(app).listen(8080)