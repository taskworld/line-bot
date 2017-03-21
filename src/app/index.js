const express = require('express')
const router = express.Router()

const verify = require('./verify')

module.exports = [
  router.post('/', (req, res) => {
    res.status(200).json(req.body)
  }),
  router.get('/verify', verify)
]
