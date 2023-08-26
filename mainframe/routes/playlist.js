const express = require('express')
const router = express.Router()

const playlistController = require('../controllers/playlistController')

router.post('/', playlistController.getAllPlaylistsForUser) // get all playlists for a user

router.put('/addSong/:id/', playlistController.addSongToPlaylist) // add a song to a playlist

router.put('/removeSong/:id/', playlistController.removeSongFromPlaylist) // remove a song from a playlist

router.get('/:id', playlistController.read) // get 1 playlist by id

router.post('/create', playlistController.create) // create a new playlist

router.put('/:id', playlistController.update) // update a playlist

router.delete('/:id', playlistController.delete) // delete a playlist

module.exports = router