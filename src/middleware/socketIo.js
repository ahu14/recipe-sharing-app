let Recipe = require("../database/recipeModel");
let User = require("../database/userModel");


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

let pullData = (recipe_id, user_id, type) => {
    if (type == 'dislike'){
        User.findById(user_id)
        .then(dt => Recipe.findOneAndUpdate({_id: recipe_id}, {$pull: {dislike: user_id}}))
        .catch(err => console.log(err))
    }
    
    else if (type == 'like'){
        User.findById(user_id)
        .then(dt => Recipe.findOneAndUpdate({_id: recipe_id}, {$pull: {like: user_id}}))
        .catch(err => console.log(err))
    }
}


let clicked = async ({recipe_id, user_id, type}) => {
    if (type == 'like'){
        let res = await checked(recipe_id, user_id, 'check');
        
        if (res == 0){
            User.findById(user_id)
            .then(dt => Recipe.findOneAndUpdate({_id: recipe_id}, {$push: {like: dt}}))
            .catch(err => console.log(err));
        }

        else{
            let res2 = await checked(recipe_id, user_id, 'like');
            let res3 = await checked(recipe_id, user_id, 'dislike');

            if (res2.length == 0){
                pullData(recipe_id, user_id, 'dislike');
            }

            else if (res3.length == 0){
                pullData(recipe_id, user_id, 'like');
            }
        }
    }
    
    else{
        let res = await checked(recipe_id, user_id, 'check');
        
        if (res == 0){
            User.findById(user_id)
            .then(dt => Recipe.findOneAndUpdate({_id: recipe_id}, {$push: {dislike: dt}}))
            .catch(err => console.log(err));
        }

        else{
            let res2 = await checked(recipe_id, user_id, 'like');
            let res3 = await checked(recipe_id, user_id, 'dislike');

            if (res2.length == 0){
                pullData(recipe_id, user_id, 'dislike');
            }

            else if (res3.length == 0){
                pullData(recipe_id, user_id, 'like');
            }
        }
    }
}

module.exports = {
    clicked
}