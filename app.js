//External modules
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)

//Core modules
const path = require('path');

//Local modules
const rootDir = require('./Utils/pathUtil');
const router = require('./routers/router')
const authRouter = require('./routers/authRouter')

dotenv.config()

const server = express()

server.set('view engine', 'ejs')
server.set('views', 'views')

const store = new mongoDBStore({
    uri: process.env.DB_PATH,
    collection: 'sessions'
})

server.use(express.static(path.join(rootDir, 'public')));
server.use(express.json());
server.use(express.urlencoded({extended: true}))
server.use(session({
    secret: 'Unc3w7Cwib3a3Waa7Nt723489YN',
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
server.use(authRouter)
server.use(router)

try{
    mongoose
    .connect(process.env.DB_PATH)
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`Server listening at http://localhost:${process.env.PORT}`)
        })
    })
    .catch(() => {
        console.log('Error connecting to database\nEscaped server listening')
    })
}
catch (err) {
    console.log('Error connecting to database\nEscaped server listening')
}