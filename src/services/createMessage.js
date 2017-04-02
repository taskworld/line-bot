import Boom from 'boom'

const createMessage = (service, url) => ({
  async reply (replyToken, messages) {
    try {
      await service.post(
        url,
        { replyToken, messages },
      )
    } catch (e) {
      if (e.response.status === 400) throw Boom.badRequest()
      throw Boom.serverUnavailable('unavailable')
    }
  }
})

export default createMessage
