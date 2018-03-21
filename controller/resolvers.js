
const Users = require('../model/userSchema.js');
const Topics = require('../model/topicSchema.js');
const Comments = require('../model/commentsSchema.js');

const resolvers = {};
resolvers.Query = {};
resolvers.Topic = {};
resolvers.Mutation = {};
resolvers.Demo = {};
resolvers.Comment = {};

resolvers.Query.getAllTopics = () => {
  return {};
};

resolvers.Demo._id = () => '1';

resolvers.Demo.topics = () => {
  return Topics.find({}, (err) => { if (err) throw err; })
    .then(result => result)
    .catch(err => console.log(err));
};

resolvers.Topic.comments = (topic) => {
  const topicId = topic._id;
  return Comments.find({ topicId }, (err) => { if (err) throw err; })
    .then(result => result)
    .catch(err => console.log(err));
};

resolvers.Topic.demo = () => {
  return {};
};

resolvers.Comment.topic = (comment) => {
  return Topics.findOne({ _id: comment.topicId }, (err) => { if (err) throw err; })
    .then(result => result)
    .catch(err => console.log(err));
};

// resolvers.Query.getASingleTopic = (_, paramObj) => {
// 	let id = paramObj.id;
// 	return Topics.findOne({_id: id}, (err) => {if (err) throw err})
//   .then((result) => result)
//   .catch((err) => console.log(err))
// }

resolvers.Mutation.addTopic = (_, topicObj) => {
	return Topics.create(topicObj).then((result) => {
		return result;
	});
}

resolvers.Mutation.addComment = (_, commentObj) => {
  return Comments.create(commentObj).then((result) => {
    return result;
  });
};

resolvers.Mutation.increaseLikes = (_, original) => {
	return Comments.findOne({_id: original._id}).then((result) => {
		let updated = result;
		updated.netScore += 1;
		return Comments.update({_id: original._id}, updated).then((result) => {
			return updated;
		});
	});
}

module.exports = resolvers;

// resolvers.Query.getASingleTopic = (_, paramObj) => {
// 	let id = paramObj.id;
// 	return Topics.findOne({_id: id}, (err) => {if (err) throw err})
//   .then((result) => result)
//   .catch((err) => console.log(err))
// }

// resolvers.Query.getAllComments = () => {
// 	return Comments.find({}, (err) => {if (err) throw err})
//   .then((result) => result)
//   .catch((err) => console.log(err));
// }