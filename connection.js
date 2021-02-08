const mysql = require("mysql");

var mySqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

mySqlConnection.connect((err) => {
    if(!err) {
        console.log("Connected!");
    }
    else {
        console.log("Connection failed", err);
    }
});

module.exports = mySqlConnection;