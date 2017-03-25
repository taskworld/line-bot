import _ from 'lodash'

export default (err, req, res, next) => {
  const output = err.output
  if (_.isEmpty(output)) {
    res.status(400).json({ 'statusCode': 400, 'message': 'Bad reuqest' })
  }
  const boomPayload = err.output.payload
  const code = boomPayload.statusCode || 500
  res.status(code).json(boomPayload)
}
