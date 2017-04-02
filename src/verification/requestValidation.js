import Joi from 'joi'
import _ from 'lodash'

function requestValidation (req) {
  const schema = Joi.object().keys({
    events: Joi.array().required()
  })
  const { body } = req
  const result = Joi.validate(body, schema)
  return _.isEmpty(result.error)
}

export default requestValidation
