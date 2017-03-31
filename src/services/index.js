
import createRequest from './createRequest'
import createToken from './createToken'

export const authRequest = createRequest(createToken.getAccessToken())
export const unAuthRequest = createRequest()
