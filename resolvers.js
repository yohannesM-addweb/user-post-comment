const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const Post = require('./models/Post.model');
const Comment = require('./models/Comment.model')
const User = require('./models/User.model')
const mongoose = require('mongoose');
const { readImageFile } = require("./middlewares/images");
const Image = require("./models/Image.model");


const resolvers = {
    Query: {
        async getUsers() {
        const users = await User.find({});
    
        return users;
        },
    
        async getPosts() {
            const posts = await Post.find({});
        
            return posts;
        },
    
        async getComments() {
        const comments = await Comment.find({});
    
        return comments;
        },

        async getImages() {
          const images = await Image.find({});
      
          return images;
        },

        async getPostsByTitle(parent, args, context, info) {
          const { title } = args;
          const posts = await Post.find({});

          return posts.filter(post => post.title == title);
        },

        // getCommentsByPostId(post: String!): [Comment!]!
        // getPostImagesByPostId(post: String!): [Image!]!
        async getCommentsByPostId (parent, args, context, info) {
          const postId = args.post;
          const comments = await Comment.find({});

          return comments.filter(comment => comment.post._id == postId);
        },

        async getPostImagesByPostId (parent, args, context, info) {
          const postId = args.post;
          const images = await Image.find({});

          return images.filter(image => image.post._id == postId);
        }
        

    },
    Mutation: {

        async createUser(_, { name, email }) {
          const newUser = new User({ name, email });
          const createdUser = await newUser.save();
      
          return createdUser;
        },
    
        async createPost(_, { title, body, user: userId }) {
          const newPost = new Post({ title, body, user: userId });
          const createdPost = await newPost.save();
          const user = await User.findById(mongoose.Types.ObjectId(userId));
          user.posts.push(createdPost._id);
          await user.save();
      
          return createdPost;
        },

        async uploadImage(_, {file, post: postId,}){
          const imageUrl = await readImageFile(file); 

          const image = new Image({
            image: imageUrl,
            post: postId
          });

          const createdImage = await image.save();
          const post = await Post.findById(mongoose.Types.ObjectId(postId));
          post.images.push(createdImage._id);
          await post.save();

          return createdImage;
        },

    

    
        async createComment(_, { text, post: postId, user: userId }) {
          const newComment = new Comment({ text, post: postId, user: userId });
          const createdComment = await newComment.save();
          const user = await User.findById(mongoose.Types.ObjectId(userId));
          const post = await Post.findById(mongoose.Types.ObjectId(postId));
          user.comments.push(createdComment._id);
          post.comments.push(createdComment._id);
          await user.save();
          await post.save();
      
          return createdComment;
        }
    },

    Upload: GraphQLUpload,

    User: {
        async posts(parent) {
          return await Post.find({ user: parent._id });
        },
    
        async comments(parent) {
          return await Comment.find({ user: parent._id });
        }
      },
    
      Post: {

        async images (parent) {
          return await Image.find({post: parent._id});
        },

        async user(parent) {
          return await User.findById(parent.user);
        },
    
        async comments(parent) {
          return await Comment.find({ post: parent._id });
        }
      },
    
      Comment: {
        async post(parent) {
          return await Post.findById(parent.post);
        },
    
        async user(parent) {
          return await User.findById(parent.user);
        }
      },

      Image: {
        async post(parent) {
          return await Post.findById(parent.post);
        },
      }

};

module.exports = resolvers;