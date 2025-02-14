require("dotenv").config();

const mongoose = require("mongoose");
const Recipe = require("../database/recipeModel");

let add_recipe = (req, res) => {
    res.render("add_recipe.ejs");
}

let post_add_recipe = async (req, res) => {
    console.log(req.body);
    
    let data = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        chef: req.user,
    })

    await data.save()
    .then(() => res.json("saved"))
    .catch(err => res.json(err));
}

module.exports = {
    add_recipe,
    post_add_recipe,
}