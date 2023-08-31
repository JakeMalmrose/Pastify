const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
const Model = Sequelize.Model;

class Song extends Model {}

Song.init({
    SongID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Artist: {
        type: DataTypes.STRING,
        allowNull: true
    },
    URL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    }, {
        sequelize,
        tableName: 'songs',
        timestamps: false,
        modelName: 'Song'
    })

module.exports = Song;