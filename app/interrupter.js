const express = require('express')
const router = express.Router()
const logger = require('../utils/log').logger

// login status interrupter
const EXCLUDED_PATHS = ['/public', '/index', '/user/login', '/user/register', '/user/exist', '/public/info']

router.all('*', async function (req, res, next) {
  logger.debug(req.method, req.url)

  // exclude req path
  if (EXCLUDED_PATHS.includes(req.path)) {
    return next()
  }
  // check login status
  if (!req.session.uid) {
    return res.status(401).json({ result: false, msg: 'login' })
  }

  next()
})

module.exports = router