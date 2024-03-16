var mysql = require('mysql'); //npm install mysql
const dotenv = require("dotenv");       // npm install dotenv
dotenv.config()

const con = mysql.createConnection({
    host: "localhost",
    user: process.dotenv.SQL_USER,
    password: process.dotenv.SQL_PASS,
    database: process.dotenv.SQL_DB
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports = con