require("dotenv").config();

const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const {Server} = require("socket.io");
const express = require("express");
const http = require("http");


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/src/views'));


const homeRoute = require("./src/router/home_route");
const commentRoute = require("./src/router/comment_route");
const logoutRoute = require("./src/router/logout_route");
const signInRoute = require("./src/router/sign_in_route");
const signUpRoute = require("./src/router/sign_up_route");
const addRecipeRoute = require("./src/router/add_recipe_route");


app.all("/", homeRoute);
app.all("/logout", logoutRoute);
app.all("/sign-in", signInRoute);
app.all("/sign-up", signUpRoute);
app.all("/comment/:id", commentRoute);
app.all("/add-recipe", addRecipeRoute);


server.listen(3000, () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("server running at 3000"))
    .catch(err => console.log(err));
})