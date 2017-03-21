const Boom = require('boom')
const bot = require('line-bot-sdk')

module.exports = (req, res, next) => {
  res.status(200).json(req.body)
}
