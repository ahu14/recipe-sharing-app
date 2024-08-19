const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    posts: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;