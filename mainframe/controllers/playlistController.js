
//Path: mainframe\controllers\playlistController.js
const Playlist = require('../models/playlist');

const playlistController = {
    create: async (req, res) => {
        try {
            const playlist = await Playlist.create({
                name: req.body['name'],
                user: req.body['user_id']
            })
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error creating playlist: " + err);
        }
    },
    read: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error reading playlist: " + err);
        }
    },
    update: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            playlist.update({
                name: req.body['name'],
                user_id: req.body['user_id']
            })
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error updating playlist: " + err);
        }
    },
    delete: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            playlist.destroy();
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error deleting playlist: " + err);
        }
    },
    getAllPlaylistsForUser: async (req, res) => {
        try {
            const playlists = await Playlist.findAll({
                where: {
                    user: req.body['user_id']
                }
            });
            res.status(200).json(playlists);
        } catch (err) {
            res.status(500).json("Error getting playlists: " + err);
        }
    },
    addSongToPlaylist: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            playlist.addSong(req.body['song']);
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error adding song to playlist: " + err);
        }
    },
    removeSongFromPlaylist: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            playlist.removeSong(req.body['song']);
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error removing song from playlist: " + err);
        }
    }
}

module.exports = playlistController;