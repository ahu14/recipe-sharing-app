require("dotenv").config();
const jwt = require("jsonwebtoken");

let verifyData = (req, res, next) => {
    let token = req.cookies.token;

    if (token != ''){
        req.headers.authorization = token;
        let authorization = req.header('Authorization');

        if (!authorization){
            res.render("home.ejs");
        }

        jwt.verify(authorization, process.env.JWT_TOKEN, (err, user) => {
            if (err) throw res.render("home.ejs");
            req.user = user.user_id;
            next();
        })
    }
}

module.exports = verifyData;