
import Boom from 'boom'
import Joi from 'joi'
import crypto from 'crypto'
import _ from 'lodash'
import request from 'request-promise'

function signatureValidation (headers, body) {
  if (process.env.NODE_ENV === 'development') return true
  if (!headers['x-line-signature']) return false
  const signature = headers['x-line-signature']
  const CHANNEL_SECRET = process.env.CHANNEL_SECRET
  return signature === crypto.createHmac('sha256', CHANNEL_SECRET).update(new Buffer(JSON.stringify(body), 'utf8')).digest('base64')
}

function requestValidation (req) {
  const schema = Joi.object().keys({
    events: Joi.array().required()
  })
  const { body } = req
  const result = Joi.validate(body, schema)
  return _.isEmpty(result.error)
}

export default (req, res, next) => {
  if (!signatureValidation(req.headers, req.body)) throw Boom.unauthorized('invalid token')
  if (!requestValidation(req)) throw Boom.badRequest()

  const { events } = req.body
  const replyToken = events[0].replyToken
  const messages = _.map(events, (event) => {
    const text = event.message.text
    return {
      'type': 'text',
      'text': 'HELLLOW  WWWEWE ' + text
    }
  })

  console.info(events)

  const ACCESS_TOKEN = process.env.ACCESS_TOKEN
  const options = {
    uri: 'https://api.line.me/v2/bot/message/reply',
    method: 'POST',
    body: {
      replyToken,
      messages
    },
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    json: true
  }

  request(options).catch(({ error }) => res.status(400).json(error))
  res.status(200)
}
