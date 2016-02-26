'use strict';

var path = process.cwd();
var request = require('request');
var history = [];

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

	app.route('/api/imagesearch/:query')
		.get(function (req, res) {
			var options = {
				url: 'https://api.imgur.com/3/gallery/search?q=' + req.params.query + '&page=' + req.query.offset,
				headers: {
					'authorization': 'Client-ID 0a2b7e7421cd00d'
				}
			};


			function callback (error, response, body) {
				if (!error && response.statusCode == 200){
					var info = JSON.parse(body);
					res.json(info);
				}

			}

			request(options, callback);
			history.push({term: req.params.query, date: new Date().toUTCString() });
		});

	app.route('/api/latest/imagesearch')
		.get(function(req, res) {
			res.json(history);
		});
};
