require("dotenv").config();
const jwt = require("jsonwebtoken");

let verifyData = (req, res, next) => {
    let token = req.cookies.token;

    if (token != ''){
        req.headers.authorization = token;
        let authorization = req.header('Authorization');

        if (!authorization){
            return next();
        }

        else{
            jwt.verify(authorization, process.env.JWT_TOKEN, (err, user) => {
                if (err) throw res.json("error");
                req.user_id = user.user_id;
                return next();
            })
        }
    }
}

module.exports = verifyData;