const {gql} = require('apollo-server-express')

const typeDefs = gql`

    scalar Upload
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
        images: [Image!]!
        user: User!
        comments: [Comment!]!
    }

    type Image {
        _id: ID!
        image: String!
        post: Post!
    }

    type Comment {
        _id: ID!
        text: String!
        post: Post!
        user: User!
      }
    type SuccessMessage {
        message: String
    }



    type Mutation {
        createUser(name: String!, email: String!): User!
        uploadImage(file: Upload!, post: String!): Image!
        createPost(title: String!, body: String!, user: String!): Post!
        createComment(text: String!, post: String!, user: String!): Comment!
        
    }

    type Query {
        getUsers: [User!]!
        getPosts: [Post!]!
        getComments: [Comment!]!
        getImages: [Image!]!

        getPostsByTitle(title: String!): [Post!]!
        getCommentsByPostId(post: String!): [Comment!]!
        getPostImagesByPostId(post: String!): [Image!]!
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