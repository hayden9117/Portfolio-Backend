const express = require('express')
const knex = require('knex')(require('./knexfile.js')['development'])
const app = express()
const port = process.env.PORT || 3001
// const db = require('./db')
const cors = require('cors')
var users = require('./routes/users')
var login = require('./routes/login')
var addList = require('./routes/addlist')
var getList = require('./routes/getlist')
var deleteList = require('./routes/deletelist')
require('dotenv').config()

// SERVER
app.listen(port, () => {
  console.log(`Listening, localhost:${port}`)
})

// Middleware
// app.use(cors({ origin: '', credentials: true }))
app.use(cors({ origin: 'http://localhost:3002', credentials: true }))
app.use(express.json())
app.use('/newuser', users)
app.use('/login', login)
app.use('/addlist', addList)
app.use('/getlist', getList)
app.use('/deletelist', deleteList)
// Routes
app.get('/', (req, res) => {
  res.send('heroku test server successful')

})

// docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v ~/docker/volumes/postgres:/var/lib/postgresql/data postgres

// app.post('/login', async (req, res) => {
//   let userName = req.body.username
//   let passWord = req.body.password


//   knex
//     .select('*')
//     .from('accounts')
//     .where({ username: `${userName}` })
//     .then(result => {
//       if (result.length === 0) {
//         res.send({ message: 'No match found, create new user.' })
//       } else if (result[0].password === passWord) {
//         res.send({ message: 'login successful' })
//       } else {
//         res.send({ message: 'incorrect password' })
//       }

//     }
//     )
// .then(data => res.status(200).json(data))
// .catch(err => res.status(404).json({ message: 'these are not the users you are looking for' }))

// {username: 'username', password: 'password'}

//   console.log(`user ${userName} pass ${passWord} result: $ ${result[0].password} `)


// })

app.get('/test', (req, res) => {
  console.log('request records')
  knex
    .select('*')
    .from('accounts')
    .orderBy('id')
    .then(data => res.status(200).json(data))
    .catch(err => {
      res.status(404).json({
        message: 'not found'
      })
    })
})

app.get('/testlist', (req, res) => {
  console.log('request records')
  knex
    .select('*')
    .from('favoriteslist')
    .orderBy('id')
    .then(data => res.status(200).json(data))
    .catch(err => {
      res.status(404).json({
        message: 'not found'
      }, console.log(err.message))
    })
})
// app.post('/newuser', (req, res) => {
//   knex
//     .select('*')
//     .from('accounts')
//     .where({ username: `${req.body.username}` })
//     .then(result => {
//       if (result.length === 0) {
//         // create the new user
//         knex.insert({
//           username: req.body.username,
//           password: req.body.password,
//         }).into('accounts')
//           .then(res.send({ message: 'successfully added new entry to database' }))

//       } else {
//         res.send({ message: 'User Already Exists' })
//       }

//     }
//     )
//     .catch(err => res.send({ message: 'error when trying to add user' }))

// })

// app.post('/update', (req, res) => {
//   console.log(req.body)
//   knex('scores')
//     .where({ username: req.body.username })
//     .update({ username: req.body.newusername })
//     .update({ password: req.body.newpassword })
//     .then(res.send({ message: 'username updated' }))
//     .catch(err => res.send({ message: 'error when updating username' }))
// })

// app.delete('/delete', (req, res) => {
//   console.log('user tried to delete', req.body.username)
//   knex('scores')
//     .del()
//     .where({ username: req.body.username })
//     .then(data => res.status(200).json(data))
//     .catch(err => {
//       res.status(404).json({
//         message: 'not found'
//       })
//     })
// })
