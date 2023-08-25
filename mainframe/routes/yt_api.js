const express =  require('express')
const router = express.Router()
const ytApiController = require('../controllers/yt_api')

router.post('/getSongByArtist', ytApiController.getSongsByArtist)
router.post('/getSongByName', ytApiController.getSongByName)

module.exports = router