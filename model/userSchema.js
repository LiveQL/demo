const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://xavyr:Sagecock02@ds249418.mlab.com:49418/graphql_practice');


var usersSchema = new Schema({
	username:  String,
	password: String,
	comments: Array
}, {collection: 'Users'});

module.exports = mongoose.model('Users', usersSchema);