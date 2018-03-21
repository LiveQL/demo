// type query, with key users points to another type User, and demands it returns as array.
// type User returns a username and password, both of types string. Inside of resolvers we need a users key
// that points to a function that goes and fetches that data and returns the types that fit the demanded Schema, (Use
const schema = `
  directive @live on FIELD_DEFINITION

  type Query {
    getAllTopics: Demo @live
    getAllComments: [Comment] 
    getASingleComment(text: String): Comment
    getASingleTopic(id: String!): Topic
  }

  type Demo {
    _id: String @live
    topics: [Topic] @live
  }

  type Topic {
    _id: String @live
    topic: String @live
    comments: [Comment] @live
    demo: Demo @live
  }

  type Comment {
    _id: String @live
    author: String @live
    topicId: String @live
    text: String @live
    netScore: Int @live
    topic: Topic @live
  }

  type Mutation {
    addTopic(topic: String ): Topic @live
    addComment(topicId: String!, text: String!, netScore: Int): Comment @live
    increaseLikes(_id: String): Comment @live
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = schema;
