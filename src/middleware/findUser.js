const User = require("../database/userModel");

let findUser = async (req, res, next) => {
    await User.findOne({_id: req.user_id})
    .then(res => {
        req.user = res; 
        return next();
    })
    .catch(err => res.json(err));
}

module.exports = findUser;