import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import knex from 'knex'
import favicon from 'serve-favicon'
import path from 'path'
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import handleProfile from './controllers/profile.js'
import image from './controllers/image.js'

const app = express()
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

const corsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(path.join(process.env.PWD, '/favicon.ico')))

app.get('/', (req,res) => {res.send('it is working')})
app.post('/signin', (req,res) => handleSignin(req,res,db,bcrypt))
app.post('/register', (req,res) => handleRegister(req,res,db,bcrypt))
app.get('/profile/:id', (req,res) => handleProfile(req,res,db))
app.put('/image', (req,res) => image.handleImage(req,res,db))
app.post('/imageurl', (req,res) => image.handleApiCall(req,res))


app.listen(process.env.PORT || 4000, () => console.log(`App is running on port ${process.env.PORT}`))