// this class is used to route the requests to the appropriate controller

const express = require('express')
const router = express.Router()

const songController = require('../controllers/songController')

router.get('/', songController.getAllSongs)

//router.get('/:songId', songController.getSongById)

router.post('/', songController.createSong)

router.put('/:songId', songController.updateSong)

router.delete('/:songId', songController.deleteSong)

module.exports = router