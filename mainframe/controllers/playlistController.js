
//Path: mainframe\controllers\playlistController.js
const Playlist = require('../models/playlist');

const playlistController = {
    create: async (req, res) => {
        try {
            const playlist = await Playlist.create({
                playlistName: req.body['playlistName'],
                userID: req.body['userID']
            })
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error creating playlist: " + err);
        }
    },
    getAll: async (req, res) => {
        try {
            const playlists = await Playlist.findAll();
            res.status(200).json(playlists);
        } catch (err) {
            res.status(500).json("Error getting playlists: " + err);
        }
    },
    getOne: async (req, res) => {
        try {
            const playlist = await Playlist.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error getting playlist: " + err);
        }
    },
    update: async (req, res) => {
        try {
            const playlist = await Playlist.update({
                playlistName: req.body['playlistName'],
                userID: req.body['userID']
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error updating playlist: " + err);
        }
    },
    delete: async (req, res) => {
        try {
            const playlist = await Playlist.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error deleting playlist: " + err);
        }
    }
}


