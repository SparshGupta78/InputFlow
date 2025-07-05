//External modules
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)

//Core modules
const path = require('path');

//Local modules
const rootDir = require('./Utils/pathUtil');
const router = require('./routers/router')
const authRouter = require('./routers/authRouter')

const DBname = 'InputFlow'
const DBpath = `mongodb+srv://sparshgupta78970:Guptaramji@sparshcluster.da50z.mongodb.net/${DBname}?retryWrites=true&w=majority&appName=SparshCluster`

const server = express()

server.set('view engine', 'ejs')
server.set('views', 'views')

const store = new mongoDBStore({
    uri: DBpath,
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

const port = 3000

try{
    mongoose
    .connect(DBpath)
    .then(() => {
        server.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`)
        })
    })
    .catch(() => {
        console.log('Error connecting to database\nEscaped server listening')
    })
}
catch (err) {
    console.log('Error connecting to database\nEscaped server listening')
}