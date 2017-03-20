require('dotenv').config()
const cors = require('cors')({ origin: true })
const express = require('express')
const bodyParser = require('body-parser')

// const auth = require('./auth')
const app = express()

app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(auth)
app.post('/', (req, res) => {
  const body = req.body
  res.status(200).json(body)
})

if (process.env.NODE_ENV === 'development') {
  app.listen('3000')
} else {
  module.exports = app
}
