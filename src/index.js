require('dotenv').config()
const axios = require('axios')
const express = require('express')
const _ = require('lodash')

const server = express()
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

server.post('/bot', (req, res) => {
  const events = req.events
  if (_.isEmpty(events)) res.send('404', 'no content here')
  for (const event in events) {
    const replyToken = event.replyToken
    const replyUrl = 'https://api.line.me/v2/bot/message/reply'
    const messge = event.message.text

    const replyMessages = [
      {
        type: 'text',
        text: messge
      }
    ]
    const postFields = JSON.parse({
      replyToken: replyToken,
			messages: replyMessages,
    })
    axios.post(
      replyUrl,
      postFields,
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      }
    )
  }
})

server.listen(3000)
