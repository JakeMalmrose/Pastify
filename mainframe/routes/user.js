const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// register a new user
router.post('/register', userController.register)

// authenticate a user
router.post('/authenticate', userController.authenticate)

module.exports = router