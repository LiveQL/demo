const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://xavyr:Sagecock02@ds249418.mlab.com:49418/graphql_practice');


var commentsSchema = new Schema({
	author: String, //should be a user
	topicId: String, //this will be topic ID
	text: String,
	netScore: Number
}, {collection: 'Comments'});

module.exports = mongoose.model('Comments', commentsSchema);