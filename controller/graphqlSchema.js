

//type query, with key users points to another type User, and demands it returns as array.
//type User returns a username and password, both of types string. Inside of resolvers we need a users key
//that points to a function that goes and fetches that data and returns the types that fit the demanded Schema, (User)

const schema = `
	directive @live on FIELD | FIELD_DEFINITION | QUERY
	type Query {
    users: [User]
    singleUser(username: String): User
    getAllTopics: [Topic]
    getASingleComment(text: String): Comment
  }
  type User {
    username: String
    password: String
    comments: [Comment]
  }
  type Topic {
    topic: String
    comments: [Comment]
  }
  type Comment {
    author: String
    topic: String
    text: String
    netScore: Int
  }
  type Mutation {
    addTopic(content: String, topic: String ): Topic
    addComment(author: String, topic: String, text: String, netScore: Int): Comment
    addUser(username: String, password: String): User @live
    updatePassword(username: String, newPassword: String): User
    deleteUser(username: String, password: String): User
  }
  schema {
    query: Query
    mutation: Mutation
	}
`;



module.exports = schema;