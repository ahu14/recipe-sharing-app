let Recipe = require("../database/recipeModel");

let home = (req, res) => {
    if (req.user != null){
        Recipe.find({}).populate("chef")
        .then(dt => res.render("home.ejs", {user: req.user, data: dt}))
        .catch(err => res.json("data couldn't loaded"));
    }

    else{
        Recipe.find({}).populate("chef")
        .then(dt => res.render("home.ejs", {data: dt}))
        .catch(err => res.json("data couldn't loaded"));
    }
}

module.exports = {
    home
}