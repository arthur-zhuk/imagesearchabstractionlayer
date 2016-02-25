'use strict';

var dotenv = require('dotenv');
dotenv.load();

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://'  + process.env.USERPASS + '@ds015878.mongolab.com:15878/urlshortener');

autoIncrement.initialize(connection);

var urlSchema = new Schema({
  url: { type: String, unique: true }
});

urlSchema.plugin(autoIncrement.plugin, 'Url');

module.exports = connection.model('Url', urlSchema);
