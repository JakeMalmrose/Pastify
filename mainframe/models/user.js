const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
const Model = Sequelize.Model;
const encryptionUtils = require('../../database/databasePasswordEncryption.js');

class User extends Model {
    // add methods here
    checkPassword(loginPw) {
        return compare(loginPw, this.Password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    encrypted_password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            key = encryptionUtils.generateKey(value);
            const { iv, hashedPassword } = encryptionUtils.encryptData(value, key);
            this.setDataValue('encrypted_password', hashedPassword);
            this.setDataValue('iv', iv);
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false,
        modelName: 'User'
    })





module.exports = User;