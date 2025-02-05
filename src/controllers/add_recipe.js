const Recipe = require("../database/recipeModel");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads/"),
    filename: (req, file, cb) => {
        let originalName = file.originalname;
        let extension = originalName.split(".");
        let filename = Date.now() + '.' + extension[extension.length-1];
        cb(null, filename);
    }
})

const upload = multer({storage: storage, limits: { fieldSize: 40 * 1024 * 1024 }});


let add_recipe = (req, res) => {
    res.render("add_recipe.ejs");
}

let post_add_recipe = async (req, res) => {
    let data = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        chef: req.user,
        image: {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            destination:req.file.destination,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        }
    })

    await data.save()
    .then(() => res.json("saved"))
    .catch(err => res.json(err));
}

module.exports = {
    add_recipe,
    post_add_recipe,
    upload
}