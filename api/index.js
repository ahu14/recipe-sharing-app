require("dotenv").config();

const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const express = require("express");
const app = express();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));



const homeRoute = require("./router/home_route");
const commentRoute = require("./router/comment_route");
const logoutRoute = require("./router/logout_route");
const signInRoute = require("./router/sign_in_route");
const signUpRoute = require("./router/sign_up_route");
const addRecipeRoute = require("./router/add_recipe_route");


app.all("/", homeRoute);
app.all("/logout", logoutRoute);
app.all("/sign-in", signInRoute);
app.all("/sign-up", signUpRoute);
app.all("/comment/:id", commentRoute);
app.all("/add-recipe", addRecipeRoute);


mongoose.connect(process.env.MONGODB_URI).catch(err => console.log(err));
app.listen(3000, () => console.log("running on 3000"));