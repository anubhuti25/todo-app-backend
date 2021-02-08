const express = require("express");
const bodyParser = require("body-parser");

const TodoRoutes = require("./routes/todo");
const UserRoutes = require("./routes/user");

var app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use("/todo", TodoRoutes);
app.use("/user", UserRoutes);

module.exports = app;