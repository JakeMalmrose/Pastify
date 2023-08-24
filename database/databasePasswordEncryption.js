const mysql = require('mysql');
const crypto = require('crypto');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'student',
  database: 'userdb',
});

connection.connect();

function generateEncryptionKey(password) {
  return crypto.scryptSync(password, 'salt', 32);
}


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

function decryptData(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));

  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');

  return decryptedData;
}

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

module.exports = {
  generateKey: generateEncryptionKey,
  encryptData: encryptData,
  decryptData: decryptData,
  addUserToDb: addUserToDatabase,
};

// const encryptionUtils = require('./databasePasswordEncryption');

