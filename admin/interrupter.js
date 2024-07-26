const express = require('express')
const router = express.Router()
const logger = require('../utils/log').logger

router.all('*', async function (req, res, next) {
  logger.debug(`Method: ${req.method}, URL: ${req.url}`)

  if (req.method === 'POST') {
    logger.debug('Request body:', req.body)
  } else if (req.method === 'GET' && req.query) {
    logger.debug('Query parameters:', req.query)
  }

  next()
})

module.exports = router