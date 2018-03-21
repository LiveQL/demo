const mongoose = require('mongoose');
const Users = require('../model/userSchema.js');
const Topics = require('../model/topicSchema.js');
const Comments = require('../model/commentsSchema.js');



const resolvers = {};
resolvers.Query = {};
resolvers.Mutation = {};
resolvers.Topic = {};
resolvers.User = {};

const directiveResolvers = {
	live: (resolve, source, args, context, info) => {
		return resolve().then((result) => {
			return result;
		});
	},
};

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
	return Users.findOne(val, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	})
}

resolvers.Query.getAllTopics = () => {
	return Topics.find({}, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	});
}

resolvers.Query.getASingleTopic = (_, paramObj) => {
	let id = paramObj.id;
	return Topics.findOne({_id: id}, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	})
}

resolvers.Query.getAllComments = () => {
	return Comments.find({}, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	});
}

// resolvers.Query.getASingleComment = (text) => {
// 	return Comments.findOne(text, (err) => {
// 		if (err) throw err;
// 	}).then((result) => {
// 		return result;
// 	}).catch((err) => {
// 		console.log(err);
// 	})
// }

resolvers.Topic.comments = (topic) => {
	let topicId = topic._id;
	return Comments.find({topicId: topicId}, (err) => {
		if (err) throw err;
	}).then((result) => {
		return result;
	}).catch((err) => {
		console.log(err);
	})
}

resolvers.User.comments = (author) => {
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
	return Users.create(usernameAndPassWord).then((result) => {
		return result;
	});
}

//this resolver resolves a schema defined query that takes in a user
resolvers.Mutation.updatePassword = (_, usernameAndNewPassword) => {
	return Users.findOneAndUpdate(
		{username: usernameAndNewPassword.username}, //here we find a document based on the username
		{password: usernameAndNewPassword.newPassword} //here we update the document that was found and change the password to be the new pw
	).then((result) => {
		return result;
	});
}

//this resolver takes user obj and removes it from the db.
resolvers.Mutation.deleteUser = (_, userObj) => {
	return Users.findOneAndRemove(userObj).then(() => true);
}

resolvers.Mutation.addTopic = (_, topicObj) => {
	return Topics.create(topicObj).then((result) => {
		return result;
	});
}

resolvers.Mutation.addComment = (_, commentObj) => {
	return Comments.create(commentObj).then((result) => {
		return result;
	});
}

resolvers.Mutation.increaseLikes = (_, original) => {
	return Comments.findOne({_id: original._id}).then((result) => {
		let updated = result;
		updated.netScore += 1;
		return Comments.update({_id: original._id}, updated).then((result) => {
			return updated;
		});
	});
}









//figure out how to make author in topic be of type user
//figure out how to make comment point to topic based on id
//figure out how to make topic comment field be array of comment ids
//directive
//pub sub
//nested resolver



module.exports = {resolvers, directiveResolvers};