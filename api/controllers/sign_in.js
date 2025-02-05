require("dotenv").config();
const User = require("../database/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let sign_in = (req, res) => {
    res.render("sign_in.ejs");
}

let post_sign_in = async (req, res) => {
    let findUser = await User.findOne({username: req.body.username});
    
    if (findUser){
        let passwordMatch = await bcrypt.compare(req.body.password, findUser.password);

        if (!passwordMatch){
            res.json("authentication failed");
        }

        else{
            const token = jwt.sign({user_id: findUser._id}, process.env.JWT_TOKEN)
            res.cookie("token", token);
            res.redirect("/");
        }
    }
}

module.exports = {
    sign_in,
    post_sign_in
}