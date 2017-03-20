if (process.env.NODE_ENV === 'development') require('@google-cloud/debug-agent').start({ allowExpressions: true })

const functions = require('firebase-functions')
const app = require('./app')

exports.bot = functions.https.onRequest(app)
