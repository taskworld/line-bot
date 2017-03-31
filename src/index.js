
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Boom from 'boom'

import ErrorHandle from './ErrorHandler'
import App from './App'

const server = express()
const port = process.env.PORT || 3000

server.use(bodyParser.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))
server.use('/v1', App)
server.all('*', (req, res, next) => next(Boom.notFound()))
server.use(ErrorHandle)

server.listen(port)
if (process.env.NODE_ENV === 'development') {
  console.log(`Server start at: http://localhost:${port}`)
}
