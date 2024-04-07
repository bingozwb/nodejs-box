const express = require('express')
const router = express.Router()
const logger = require('../utils/log').logger

// login status interrupter
const EXCLUDED_PATHS = ['/public', '/index', '/login']

router.all('*', async function (req, res, next) {
  logger.debug('interrupter start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  logger.debug(req.method, req.url)
  if(req.method === 'POST') {
    logger.debug(req.body)
  }

  // exclude req path
  if (EXCLUDED_PATHS.includes(req.path)) {
    return next()
  }
  // check login status
  if (!req.session.admin_id) {
    return res.json({ result: false, msg: 'login' })
  }
  // todo: check admin role

  next()
})

module.exports = router