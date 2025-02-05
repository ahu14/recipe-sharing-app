let Recipe = require("../database/recipeModel");

let checked = async (recipe_id, user_id, type) => {
    let res = await Recipe.findOne({_id: recipe_id}).populate({path: "like", match: {_id: user_id}})
    let res2 = await Recipe.findOne({_id: recipe_id}).populate({path: "dislike", match: {_id: user_id}})

    if (type == 'check'){
        return res.like.length || res2.dislike.length;
    }
    
    else if (type == 'like'){
        return res.like;
    }

    else if (type == 'dislike'){
        return res2.dislike;
    }
}

module.exports = checked;