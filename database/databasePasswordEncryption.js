const mysql = require('mysql');
const crypto = require('crypto');


//creates a connection to mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'student',
  database: 'userdb',
});

connection.connect();


//creates an encryption key to keep password data safe
function generateEncryptionKey(password) {
  return crypto.scryptSync(password, 'salt', 32);
}


//encrypts the data using the parameters data being password and key being the hash key
function encryptData(data, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');

  return {
    iv: iv.toString('hex'),
    hashedPassword: encryptedData
  };
}


//decryptes the data for log in authentication
function decryptData(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));

  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');

  return decryptedData;
}

//funciton to add user to the database after encrypting
function addUserToDatabase(username, password) {
  const encryptionKey = generateEncryptionKey();

  const encryptedUserName = encryptData(username, encryptionKey);
  const encryptedPassword = encryptData(password, encryptionKey);

  const decryptedUserName = decryptData(
    encryptedUserName.encryptedData,
    encryptionKey,
    encryptedUserName.iv
  );

  const decryptedPassword = decryptData(
    encryptedPassword.encryptedData,
    encryptionKey,
    encryptedPassword.iv
  );

  const saltString = `('${encryptedUserName.encryptedData}'`;
  const hashedPasswordString = `,'${encryptedPassword.encryptedData}')`;
  const fullString = `insert into userdb.users(username, encrypted_password) values (${saltString}${hashedPasswordString})`;

  connection.query(fullString, function (error, results, fields) {
    if (error) throw error;
    console.log("Added user to the database.");
  });
}

connection.end();


//this is used to export funcitons to be used in other files
module.exports = {
  generateKey: generateEncryptionKey,
  encryptData: encryptData,
  decryptData: decryptData,
  addUserToDb: addUserToDatabase,
};

// const encryptionUtils = require('./databasePasswordEncryption');

