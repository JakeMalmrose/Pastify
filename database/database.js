var mysql = require('mysql');
const crypto = require('crypto');

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

  function generateEncryptionKey() {
    return crypto.randomBytes(32); // 32 bytes for AES-256
  }

  function encryptData(data, key) {
    const iv = crypto.randomBytes(16); // Initialization vector (IV) - 16 bytes
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
  
    return {
      iv: iv.toString('hex'),
      encryptedData
    };
  }

  function decryptData(encryptedData, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
  
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
  
    return decryptedData;
  }

  const encryptionKey = generateEncryptionKey();
  console.log(encryptionKey + "       this")

  const dataToEncryptUserName = 'username';
  const dataToEncryptPassword = "password";

  const encryptedUserName = encryptData(dataToEncryptUserName, encryptionKey);
  console.log('Encrypted:', encryptedUserName);

  const encryptedPassword = encryptData(dataToEncryptPassword, encryptionKey);
  console.log('Encrypted:', encryptedPassword);

  const decryptedUserName = decryptData(encryptedUserName.encryptedData, encryptionKey, encryptedUserName.iv);
  console.log('Decrypted:', decryptedUserName);

  const decryptedPassword = decryptData(encryptedPassword.encryptedData, encryptionKey, encryptedPassword.iv);
  console.log('Decrypted:', decryptedPassword);


  const saltString = `('${encryptedUserName}'`;
  const hashedPasswordString = `,'${encryptedPassword}')`;
  const fullString = `insert into userdb.users(username, encrypted_password) values ${saltString}${hashedPasswordString}`;
  console.log(fullString);

  connection.query(fullString, function(error, results, fields) {
        if (error) throw error;
        console.log("Added user to the database.");
      });


  connection.end();


