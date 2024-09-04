let Recipe = require("../database/recipeModel");
let User = require("../database/userModel");
let checked = require("../utils/checked");
let pullData = require("../utils/pullData");


let home = (req, res) => {
    if (req.user != null){
        Recipe.find({}).populate(["chef", {path: "like", match: {_id: req.user._id}}, {path: "dislike", match: {_id: req.user._id}}])
        .then(dt => res.render("home.ejs", {user: req.user, data: dt}))
        .catch(err => res.json("data couldn't loaded"));
    }

    else{
        Recipe.find({}).populate(["chef", "like", "dislike"])
        .then(dt => res.render("home.ejs", {data: dt}))
        .catch(err => res.json("data couldn't loaded"));
    }
}


let postHome = async (req, res) => {
    let {recipe_id, user_id, type} = req.body;
   
    let res_length = await checked(recipe_id, user_id, 'check', res); 
    let res_like = await checked(recipe_id, user_id, 'like', res);
    let res_dislike = await checked(recipe_id, user_id, 'dislike', res);
    

    if (type == 'like' || type == 'unlike'){
        if (res_length == 0){
            User.findById(user_id)
            .then(dt => Recipe.findOneAndUpdate({_id: recipe_id}, {$push: {like: dt}}))
            .then(() => res.redirect("/"))
            .catch(err => console.log(err));
        }

        else{
            if (res_like.length == 0){
                pullData(recipe_id, user_id, 'dislike', res);
            }

            else if (res_dislike.length == 0){
                pullData(recipe_id, user_id, 'like', res);
            }
        }
    }
    
    else{
        if (res_length == 0){
            User.findById(user_id)
            .then(dt => Recipe.findOneAndUpdate({_id: recipe_id}, {$push: {dislike: dt}}))
            .then(() => res.redirect("/"))
            .catch(err => console.log(err));
        }

        else{
            if (res_like.length == 0){
                pullData(recipe_id, user_id, 'dislike', res);
            }

            else if (res_dislike.length == 0){
                pullData(recipe_id, user_id, 'like', res);
            }
        }
    }
}

module.exports = {
    home,
    postHome
}