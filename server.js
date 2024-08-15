const express = require("express");
const app = express();

const homeRoute = require("./src/router/homeRoute");
app.use("/", homeRoute);

app.listen(3000, () => {
    console.log("server running at 3000");
})