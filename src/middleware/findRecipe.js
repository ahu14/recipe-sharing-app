let Recipe = require("../database/recipeModel");

let findRecipe = (req, res, next) => {
    Recipe.findById(req.params.id)
    .then(dt => {
        req.data = dt;
        return next();
    })
    .catch(err => console.log(err))
}

module.exports = findRecipe;