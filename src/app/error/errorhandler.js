module.exports = (err, req, res, next) => {
  console.log(err)
  const boomPayload = err.output.payload
  const code = boomPayload.statusCode || 500
  res.status(code).json(boomPayload)
}
