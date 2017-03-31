
import axios from 'axios'

const createRequest = (accessToken = null) => {
  return axios.create({
    timeout: 10000,
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : { },
  })
}

export default createRequest
