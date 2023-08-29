const Song = require('../models/song');

const songController = {
    // required functions are create, read, update, delete
    // create a new song
    createSong: async (req, res) => {
        try {
            const song = await Song.create({
                Title: req.body.title,
                Artist: req.body.artist,
                URL: req.body.url,
            })
            res.status(200).json(song);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // read a song
    readSong: async (req, res) => {
        try {
            const song = await Song.findByPk(req.params.id);
            res.status(200).json(song);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a song by url
    getSongByUrl: async (req, res) => {
        try {
            const song = await Song.findOne({
                where: {
                    URL: req.body.url
                }
            });
            if (!song) {
                res.status(404).json("Song not found");
            } else {
                res.status(200).json(song);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a song
    updateSong: async (req, res) => {
        try {
            const song = await Song.findByPk(req.params.id);
            song.update({
                Title: req.body.title,
                Artist: req.body.artist,
                URL: req.body.URL,
            })
            res.status(200).json(song);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a song
    deleteSong: async (req, res) => {
        try {
            const song = await Song.findByPk(req.params.id);
            song.destroy();
            res.status(200).json(song);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get all songs
    getAllSongs: async (req, res) => {
        try {
            const songs = await Song.findAll();
            res.status(200).json(songs);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getSongById: async (req, res) => {
        try {
            console.log(req.params.id)
            const song = await Song.findByPk(req.params.id);
            if (!song) {
                res.status(404).json("Song not found");
            } else {
                res.status(200).json(song);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = songController;