const {mongoose, Schema} = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimeptype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number,
        created_at: Date,
        updated_at: Date
    },
    ingredients: {
        type: String,
        required: true 
    },
    steps: {
        type: String,
        required: true,
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislike: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date, 
        default: Date.now,
        get: (date) => date.toLocaleString()
    }
})

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;