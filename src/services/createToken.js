if (process.env.NODE_ENV === 'development') require('dotenv').config()

const createToken = {
  getAccessToken: () => process.env.ACCESS_TOKEN
}

export default createToken
