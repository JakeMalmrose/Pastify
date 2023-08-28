// this class is used to route the requests to the appropriate controller

const express = require('express')
const router = express.Router()

const songController = require('../controllers/songController')

router.get('/', songController.getAllSongs)

router.get('/:id', songController.getSongById)

router.post('/', songController.createSong)

router.put('/:id', songController.updateSong)

router.delete('/:id', songController.deleteSong)

router.post('/getSongByUrl', songController.getSongByUrl)

module.exports = router