const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
const Model = Sequelize.Model;

class User extends Model {
    // add methods here
    checkPassword(loginPw) {
        return compare(loginPw, this.Password);
    }
}

User.init({
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hashedPassword = value; // TODO: hash this
            this.setDataValue('Password', hashedPassword);
        }
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        sequelize,
        tableName: 'Users',
        timestamps: false,
        modelName: 'User'
    })





module.exports = User;