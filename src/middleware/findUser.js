const User = require("../database/userModel");

let findUser = async (req, res, next) => {
    await User.findOne({_id: req.user})
    .then(res => {
        req.user = res; 
        next();
    })
    .catch(err => res.json(err));
}

module.exports = findUser;