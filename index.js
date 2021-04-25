const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pool = require('./config')
const app = express()

const db = require('./queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(cors())

app.get('/', (req,res) =>{
    res.json({info: 'Node.js, Express, and Postgres API'})

})
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening.`)
})

