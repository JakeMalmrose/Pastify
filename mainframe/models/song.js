const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Song extends Model {
    // add methods here
}


const Song = sequelize.define('song', {
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
        allowNull: false
    },
    URL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    }, {
        tableName: 'songs',
        timestamps: false
    })

module.exports = Song;