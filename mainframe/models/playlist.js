const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
const Model = Sequelize.Model;
const Song = require('./song');

class Playlist extends Model {
    // add methods here
}

class PlaylistSong extends Model {
    // add methods here
}

Playlist.init({
    playlistid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, {
        sequelize,
        tableName: 'playlists',
        timestamps: false,
        modelName: 'Playlist'
    })



PlaylistSong = sequelize.define('playlists_song', {});
    
Playlist.belongsToMany(Song, { through: PlaylistSong, allowNull: true });
Song.belongsToMany(Playlist, { through: PlaylistSong, allowNull: true });

module.exports = Playlist;