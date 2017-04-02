import assert from 'power-assert'

import signatureValidation from './signatureVerification'

describe('signatureValidation', () => {
  it('should be given false if header is not contain x-line-signature topic', () => {
    const headers = { 'Authorization': 'Barear foobarToken' }
    const body = { events: [{ foo: 'bar' }] }
    assert.equal(signatureValidation(headers, body), false)
  })
})
