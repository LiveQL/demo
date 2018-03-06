const credentials = require('./../credentials');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(`mongodb://${credentials.dbUsername}:${credentials.dbPassword}@ds249418.mlab.com:49418/graphql_practice`);


var topicSchema = new Schema({
	topic: String,
	comments: Array, // needs to be array of all the comments
}, {collection: 'Topics'});

module.exports = mongoose.model('Topics', topicSchema);