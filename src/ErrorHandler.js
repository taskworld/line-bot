export default (err, req, res, next) => {
  const boomPayload = err.output.payload
  const code = boomPayload.statusCode || 500
  res.status(code).json(boomPayload)
}
