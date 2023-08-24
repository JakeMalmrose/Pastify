const express =  require('express')
const router = express.Router()
const ytApiController = require('../controllers/ytApiController')

router.post('/getSongByArtist', ytApiController.getSongURL)

module.exports = router
