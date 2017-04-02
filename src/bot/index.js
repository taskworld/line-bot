
import Boom from 'boom'
import _ from 'lodash'

import signatureValidation from '../verification/signatureVerification'
import requestValidation from '../verification/requestValidation'
import { Message } from '../services'

export default async (req, res, next) => {
  if (!signatureValidation(req.headers, req.body)) next(Boom.unauthorized('invalid token'))
  if (!requestValidation(req)) next(Boom.badRequest())

  const { events } = req.body
  const replyToken = events[0].replyToken
  const messages = _.map(events, (event) => {
    const text = event.message.text
    return {
      'type': 'text',
      'text': 'echo don blame me' + text
    }
  })

  try {
    await Message.reply(replyToken, messages)
  } catch (e) {
    next(e)
  }
}
