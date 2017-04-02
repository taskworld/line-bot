import assert from 'power-assert'

import requestValidation from './requestValidation'

describe('requestValidation', () => {
  it('should be given false when request body does not contain an expect object', () => {
    const request = { body: { fooo: 'dadada' } }
    assert.equal(requestValidation(request), false)
  })

  it('should be given false when expect object is not contain an array', () => {
    const expect = { events: 'dadada' }
    const request = { body: expect }
    assert.equal(requestValidation(request), false)
  })
})
