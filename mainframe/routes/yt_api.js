const express =  require('express')
const router = express.Router()
const ytApiController = require('../controllers/yt_api')

router.post('/getSongByArtist', ytApiController.getSongUrl)

module.exports = router
