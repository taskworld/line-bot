if (process.env.NODE_ENV === 'development') require('dotenv').config()
import crypto from 'crypto'

function signatureValidation (headers, body) {
  if (process.env.NODE_ENV === 'development') return true

  if (!headers['x-line-signature']) return false
  const signature = headers['x-line-signature']
  const CHANNEL_SECRET = process.env.CHANNEL_SECRET
  return signature === crypto.createHmac('sha256', CHANNEL_SECRET).update(new Buffer(JSON.stringify(body), 'utf8')).digest('base64')
}

export default signatureValidation
