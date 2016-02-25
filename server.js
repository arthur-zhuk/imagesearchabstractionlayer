'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var dotenv = require('dotenv');
dotenv.load();

var app = express();

//mongoose.connect(process.env.MONGO_URI);
//mongoose.connect(process.env.MONGO);


routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
