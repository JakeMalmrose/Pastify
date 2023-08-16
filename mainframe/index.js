// This is the main entry point for this server. The server takes in requests from the client, and handles all logic and database queries.

// lots of imports
const express = require ('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

// routes
const userRoutes = require('./routes/user')
const playlistRoutes = require('./routes/playlist')
const songRoutes = require('./routes/song')

// middleware
const authentication = require('./middleware/authentication')

const app = express()

// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// set port
const port = 3001

// set up database connection
const db = mysql.createConnection({
    host: 'localhost',
    //TODO: FINISH CONNECTION
})

// this is where we would use authentication middleware

// set up routes
app.use('/user', userRoutes)
app.use('/playlist', playlistRoutes)
app.use('/song', songRoutes)

// handle errors on middleware
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Something broke!')
})


// start listening
app.listen(port, () => {
    console.log(`Mainframe listening at http://localhost:${port}`)
})