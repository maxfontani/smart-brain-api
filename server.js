import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import knex from 'knex'
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import handleProfile from './controllers/profile.js'
import image from './controllers/image.js'

const app = express()
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '3534904316',
        database: 'smart-brain-db'
    }
})

app.use(cors())
app.use(bodyParser.json())


// app.get('/', (req,res) => {res.send(db.users)})

app.post('/signin', (req,res) => handleSignin(req,res,db,bcrypt))
app.post('/register', (req,res) => handleRegister(req,res,db,bcrypt))
app.get('/profile/:id', (req,res) => handleProfile(req,res,db))
app.put('/image', (req,res) => image.handleImage(req,res,db))
app.post('/imageurl', (req,res) => image.handleApiCall(req,res))


app.listen(4000, () => console.log('App is running on port 4000'))