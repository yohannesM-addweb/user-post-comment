const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true
      },
  
      post: {
        type: mongoose.Types.ObjectId,
        ref: "post"
      },
  
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
      }

}, {timestamps: true});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;