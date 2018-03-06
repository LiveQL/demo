const mongoose = require('mongoose');
const Users = require('../model/userSchema.js');
const Topics = require('../model/topicSchema.js');
const Comments = require('../model/commentsSchema.js');
// const PubSub = require('graphql-subscriptions').PubSub;
// const withFilter =require('graphql-subscriptions').withFilter;

const resolvers = {};

//const pubsub = new PubSub();

resolvers.Query = {};
resolvers.Mutation = {};
resolvers.Topic = {};
resolvers.User = {};
//resolvers.Subscription = {};

resolvers.Query.users = () => {
	return Users.find({}, (err) => {
		if (err) throw err;
	})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log(err);
		});
};

resolvers.Query.singleUser = (_, val) => {
	console.log('here in the single user resolver');
	console.log(val);
	return Users.findOne(val, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	})
}

resolvers.Query.getAllTopics = () => {
	console.log('here in the get all topics resolver');
	return Topics.find({}, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	});
}

resolvers.Query.getASingleComment = (text) => {
	return Comments.findOne(text, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	})
}

resolvers.Topic.comments = (topic) => {
	let theTopic = topic.topic;
	return Comments.find({topic: theTopic}, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	})
}


resolvers.User.comments = (author) => {
	console.log(author);
	let theAuthor = author.username;
	return Comments.find({author: theAuthor}, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	})
}

resolvers.Mutation.addUser = (_, usernameAndPassWord) => {
	console.log('here in the add user resolver');
	return Users.create(usernameAndPassWord).then((result) => {
		pubsub.publish('addAnotherUser', {addUser: result});
		return result;
	});
}

//this resolver resolves a schema defined query that takes in a user
resolvers.Mutation.updatePassword = (_, usernameAndNewPassword) => {
	console.log('here in update password resolver');
	console.log(usernameAndNewPassword);
	return Users.findOneAndUpdate(
		{username: usernameAndNewPassword.username}, //here we find a document based on the username
		{password: usernameAndNewPassword.newPassword} //here we update the document that was found and change the password to be the new pw
	).then((result) => {
		console.log(result);
		return result;
	});
}

//this resolver takes user obj and removes it from the db.
resolvers.Mutation.deleteUser = (_, userObj) => {
	console.log('here in update delete user resolver');
	console.log(userObj);
	return Users.findOneAndRemove(userObj).then(() => true);
}

resolvers.Mutation.addTopic = (_, topicObj) => {
	console.log('here in the add topic resolver');
	console.log(topicObj);
	return Topics.create(topicObj).then((result) => {
		return result;
	});
}

resolvers.Mutation.addComment = (_, commentObj) => {
	console.log('here in the add comment resolver');
	return Comments.create(commentObj).then((result) => {
		return result;
	});
}

// resolvers.Subscription = {
// 	addUser: {
// 		subscribe: () => {
// 			return pubsub.asyncIterator('addAnotherUser');
// 		}
// 	}
// }







//figure out how to make author in topic be of type user
//figure out how to make comment point to topic based on id
//figure out how to make topic comment field be array of comment ids
//directive
//pub sub
//nested resolver



module.exports = resolvers;