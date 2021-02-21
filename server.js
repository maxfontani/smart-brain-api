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

app.use(cors())
app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, '', 'favicon.ico')))

app.get('/', (req,res) => {res.send('it is working')})
app.post('/signin', (req,res) => handleSignin(req,res,db,bcrypt))
app.post('/register', (req,res) => handleRegister(req,res,db,bcrypt))
app.get('/profile/:id', (req,res) => handleProfile(req,res,db))
app.put('/image', (req,res) => image.handleImage(req,res,db))
app.post('/imageurl', (req,res) => image.handleApiCall(req,res))


app.listen(process.env.PORT || 4000, () => console.log(`App is running on port ${process.env.PORT}`))