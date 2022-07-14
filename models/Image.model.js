const mongoose = require('mongoose');

const ImageSchema= new mongoose.Schema({

    image: {
        type: String,
        required: true
    },

    post: {
        type: mongoose.Types.ObjectId,
        ref: "post"
      },

});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;