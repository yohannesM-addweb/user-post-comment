const {gql} = require('apollo-server-express')

const typeDefs = gql`

    type User {
        _id: ID!
        name: String!
        email: String!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        _id: ID!
        title: String!
        body: String!
        image: String
        user: User!
        comments: [Comment!]!
    }

    type Comment {
        _id: ID!
        text: String!
        post: Post!
        user: User!
      }



    type Mutation {
        createUser(name: String!, email: String!): User!
        createPost(title: String!, body: String!, user: String!): Post!
        uploadImage(image: GraphQLUpload!): Boolean
        createComment(text: String!, post: String!, user: String!): Comment!
        
    }

    type Query {
        getUsers: [User!]!
        getPosts: [Post!]!
        getComments: [Comment!]!
      }
`;

// addComment(comment: commentInput): Comment
// createPost(post: postInput) : Post
// deletePost(id: ID): String
// updatePost(id: ID, post: postInput): Post

// type Query {
    
//     posts: [Post]

//     getPost(id: ID): Post
// }

// input postInput {
//     title: String,
//     description: String
// }

// input commentInput {
//     author: String
//     text: String
// }


module.exports = typeDefs;