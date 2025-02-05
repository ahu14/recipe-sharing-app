require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/userModel");

let sign_up = (req, res) => {
    res.render("sign_up.ejs");
}

let post_sign_up = async (req, res) => {
    let is_username_used = await User.findOne({username: req.body.username});

    if (!is_username_used){
        let salt = await bcrypt.genSalt(10);

        await bcrypt.hash(req.body.password, salt)
        .then(async hashPassword => {
            req.body.password = hashPassword;
            let user = new User(req.body);

            await user.save()
            .then(() => {
                let token = jwt.sign({user_id : user._id}, process.env.JWT_TOKEN);
                res.cookie("token", token);
                res.redirect("/");
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    }

    else{
        res.json("username used !");
    }
}

module.exports = {
    sign_up,
    post_sign_up
}