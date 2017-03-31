
import express from 'express'

import Bot from './bot'
const router = express.Router()

export default [
  router.get('/ping', (req, res) => { res.status(200).json({ greeting: 'hello' }) }),
  router.post('/bot', Bot),
  router.post('/hooknoti', (req, res) => { res.status(200).json({ greeting: 'hello' }) })
]
