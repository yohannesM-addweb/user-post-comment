const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
      },
  
    email: {
        type: String,
        required: true
        },

    posts: [
    {
        type: mongoose.Types.ObjectId,
        ref: "post"
    }
    ],

    comments: [
    {
        type: mongoose.Types.ObjectId,
        ref: "comment"
    }
    ]

});

const User = mongoose.model('user', UserSchema);

module.exports = User;