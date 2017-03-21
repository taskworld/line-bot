import express from 'express'
const router = express.Router()

export default [
  router.get('/', async (req, res) => {
    res.status(200).json('fuck')
  })
]
