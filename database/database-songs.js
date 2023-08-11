var mysql = require('mysql');

var userCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "student"
    });

userCon.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = {
    userCon : userCon
}