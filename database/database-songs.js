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

function getSongList(callback) {
    // use the pastify database
    userCon.query("USE pastify", function (err, result) {
        if (err) throw err;
        console.log("Using music database");
    });
    // get the song list
    userCon.query("SELECT * FROM songs", function (err, result) {
        if (err) throw err;
        console.log("Got song list");
        callback(result);
    });
}

getSongList(function(result) {
    console.log(result);
});


module.exports = {
    userCon : userCon
}