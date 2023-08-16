const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('testdb2', 'root', 'student', {
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    password: 'student'
});



module.exports = sequelize;