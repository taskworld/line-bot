
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
const Boom = require('boom')

import App from './App'
import ErrorHandle from './ErrorHandler'

const server = express()

server.use(cors())
server.use(helmet())
server.use(morgan('dev'))
server.use('/v1', App)
server.all('*', (req, res, next) => next(Boom.notFound()))
server.use(ErrorHandle)

server.listen(3000)
if (process.env.NODE_ENV === 'development') {
  console.log('Server start at: http://localhost:3000')
}
