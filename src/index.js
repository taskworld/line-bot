require('dotenv').config()
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Boom from 'boom'

import Bot from './bot'

import ErrorHandle from './ErrorHandler'

const server = express()
const router = express.Router()

server.use(bodyParser.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))
server.use('/v1', [
  router.get('/ping', (req, res) => { res.status(200).json({ greeting: 'hello' }) }),
  router.post('/bot', Bot)
])
server.all('*', (req, res, next) => next(Boom.notFound()))
server.use(ErrorHandle)

server.listen(3000)
if (process.env.NODE_ENV === 'development') {
  console.log('Server start at: http://localhost:3000')
}
