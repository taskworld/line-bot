require('dotenv').config()
const cors = require('cors')({ origin: true })
const express = require('express')

const auth = require('./auth')
const app = express()

app.use(cors)
app.use(auth)
app.get('/', (req, res) => {
  res.send(`Hello world ${req.token}`)
})

if (process.env.NODE_ENV === 'development') {
  app.listen('3000')
} else {
  module.exports = app
}
