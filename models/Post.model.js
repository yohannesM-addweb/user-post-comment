const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
      },
  
      body: {
        type: String,
        required: true
      },

      images: [{
        type: mongoose.Types.ObjectId,
        ref: "image"
      }
      ],
  
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
      },
  
      comments: [
        {
          type: mongoose.Types.ObjectId,
          ref: "comment"
        }
      ]

}, {timestamps: true});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;