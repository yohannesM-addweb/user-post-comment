const Post = require('./models/Post.model');
const Comment = require('./models/Comment.model')
const User = require('./models/User.model')
const mongoose = require('mongoose');
const GraphQLUpload = require('graphql-upload');

const resolvers = {
    Query: {
        
        // posts: async () => {
        //     return await Post.find();
        // },

        // getPost: async (_parent, args, _context, _info) => {
        //     return await Post.findById(args.id);
        // }

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

        

        async uploadImage() {
            return "Ok"
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

        // addComment: async (parent, args, context, info) => {
        //     const {author, text} = args.comment;
        //     const comment = new Comment({author, text});

        //     await comment.save();
        //     return comment;
        // },
        // createPost: async (parent, args, context, info) => {
        //     const {title, description} = args.post;
        //     const post = new Post({title, description});

        //     await post.save();
        //     return post;
        // },
        // deletePost: async (parent, args, context, info) => {
        //     const {id} = args;

        //     await Post.findByIdAndDelete(id);
        //     return "Ok, post is deleted.";
        // },
        // updatePost:  async (parent, args, context, info) => {
        //     const {id} = args;
        //     const {title, description} = args.post;

        //     const updates = {};

        //     if(title !== undefined) {
        //         updates.title = title
        //     }

        //     if(description !== undefined) {
        //         updates.description = description
        //     }
            
        //     const post = await Post.findByIdAndUpdate(id, 
        //         updates, 
        //         {new: true}
        //         );

        //     console.log(title)

        //     return post;

        // }
    },

    User: {
        async posts(parent) {
          return await Post.find({ user: parent._id });
        },
    
        async comments(parent) {
          return await Comment.find({ user: parent._id });
        }
      },
    
      Post: {
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
      }
};

module.exports = resolvers;