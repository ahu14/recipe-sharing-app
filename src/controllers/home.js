let home = (req, res) => {
    if (req.user != null){
        res.render("home.ejs", {data: req.user});
    }

    else{
        res.render("home.ejs", {data: null});
    }
}

module.exports = {
    home
}