const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class User extends Model {
    // add methods here
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
        allowNull: false
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