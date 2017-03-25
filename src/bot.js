
import Boom from 'boom'
import Joi from 'joi'
import crypto from 'crypto'
import _ from 'lodash'
import axios from 'axios'

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

async function pushMessage (replyToken, messages) {
  const replyUrl = 'https://api.line.me/v2/bot/message/push'
  const TOKEN = process.env.ACCESS_TOKEN
  return await axios.post(
    replyUrl,
    {
      replyToken: replyToken,
      messages: messages
    },
    {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export default (req, res, next) => {
  if (!signatureValidation(req.headers, req.body)) throw Boom.unauthorized('invalid token')
  if (!requestValidation(req)) throw Boom.badRequest()

  const { events } = req.body
  const messages = _.map(events, (event) => {
    const { replyToken, type, source, message } = event
    const userId = source.userId
    const textType = message.type
    const text = message.text
    return `fooo ${text}`
  })
  console.log(messages)
  res.status(200).json('done')
}
