const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true 
    }],
    description: {
        type: String,
        required: true,
    },
    like: [{
        type: Schema.Types.ObjectId.ObjectId,
        ref: 'User'
    }],
    dislike: [{
        type: Schema.Types.ObjectId.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;