require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const Recipe = require("../database/recipeModel");

let add_recipe = (req, res) => {
    res.render("add_recipe.ejs");
}

let post_add_recipe = async (req, res) => {
    let result = await cloudinary.uploader.upload(req.file.path);
    
    let data = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        image: result.secure_url,
        cloudinary_id: result.public_id,
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