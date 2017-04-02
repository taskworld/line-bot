import Boom from 'boom'

export default (req, res, next) => {
  const body = req.body
  if (!body) next(Boom.badRequest())
  res.status(200).json({ 'greeting': 'work fine' })
}
