var mysql = require('mysql');
const crypto = require('crypto');

var saltString =""
var hashedPasswordStirng = ""

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'student',
  database : 'userdb'
});

connection.connect();


  async function hashPassword(password) {
    const salt = await crypto.randomBytes(16).toString('hex');
    const hashedPassword = await crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt,
      hashedPassword
    };
  }

  
  
  const originalPassword = 'myPassword123';
  hashPassword(originalPassword).then(({ salt, hashedPassword }) => {
    console.log('Salt:', salt);
    console.log('Hashed Password:', hashedPassword);
    
    saltString = '(',salt
    hashedPasswordStirng = ',',hashedPassword,")"


  });

  var fullString = 'insert into userdb.users(username, encrypted_password) values ' ,saltString  , hashedPasswordStirng;
  console.log(fullString)

  connection.query(fullString, function(error, results, fields) {
    if (error) throw error;
    console.log("Added user to the database.");
  });

  connection.end();

  

