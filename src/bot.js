
import Boom from 'boom'
import Joi from 'joi'
import crypto from 'crypto'
import _ from 'lodash'

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
  const result = _.map(events, (event) => {
    const { replyToken, type, source, message } = event
    const userId = source.userId
    const textType = message.type
    const text = message.text
  })

  res.status(200).json('done')
}
