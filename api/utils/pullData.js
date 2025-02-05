let Recipe = require("../database/recipeModel");
let User = require("../database/userModel");

let pullData = (recipe_id, user_id, type, res) => {
    if (type == 'dislike'){
        User.findById(user_id)
        .then(() => Recipe.findOneAndUpdate({_id: recipe_id}, {$pull: {dislike: user_id}}))
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
    }
    
    else if (type == 'like'){
        User.findById(user_id)
        .then(() => Recipe.findOneAndUpdate({_id: recipe_id}, {$pull: {like: user_id}}))
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
    }
}

module.exports = pullData;