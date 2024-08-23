const {mongoose, Schema} = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;