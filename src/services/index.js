
import createRequest from './createRequest'
import createToken from './createToken'
import createMessage from './createMessage'

export const authRequest = createRequest(createToken.getAccessToken())
export const unAuthRequest = createRequest()

export const Message = createMessage(authRequest, 'https://api.line.me/v2/bot/message/reply')
