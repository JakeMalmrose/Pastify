const express = require('express')
const router = express.Router()

const playlistController = require('../controllers/playlistController')

router.get('/', playlistController.getAllPlaylistsForUser)

router.get('/:id', playlistController.read)

router.post('/', playlistController.create)

router.put('/:id', playlistController.update)

router.put('/:id/addSong', playlistController.addSongToPlaylist) 

router.put('/:id/removeSong', playlistController.removeSongFromPlaylist)

router.delete('/:id', playlistController.delete)

module.exports = router