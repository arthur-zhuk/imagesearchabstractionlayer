'use strict';

var path = process.cwd();

var urlController = require(path + '/app/controllers/urlController.js');
var give = new urlController();

module.exports = function (app) {


	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});


	app.route('/new/:url(*)')
		.get(function(req, res) {
			var base = req.headers['x-forwarded-proto'] + '://' + req.headers.host.split(':')[0];
			give.new(base, res, req.params.url);
		});

	app.route('/:id(\\d+)')
		.get(function (req, res) {
			give.search(res, req.params.id);
		});
};
