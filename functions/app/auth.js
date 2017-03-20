
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized')
  }
  next()
}

module.exports = verifyToken
