const Comment = require("../database/commentModel");
const Recipe = require("../database/recipeModel");

let comment = (req, res) => {
    req.data.populate({path: 'comments', populate: {path: 'chef', model: 'User'}})
    .then(dt => res.render("comment.ejs", {comments: dt.comments}))
    .catch(err => console.log(err));
}

let post_comment = async (req, res) => {
    if (req.user == null){
        res.json("haha you are not user");
    }

    else{
        let data = new Comment({
            comment: req.body.comment,
            recipe: req.data._id,
            chef: req.user._id
        })
    
        await data.save()
        .then(async dt => {
            Recipe.findOneAndUpdate({_id: req.data._id}, {$push: {comments: dt}})
            .then(() => res.redirect("/comment/" + req.data._id))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
}

module.exports = {
    comment,
    post_comment
}