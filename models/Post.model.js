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

      image: {
        type: String
      },
  
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

});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;