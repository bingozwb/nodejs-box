const express = require('express')
const router = express.Router()
const util = require('util')
const asyncdb = require('../utils/mysqlUtil')
const timeUtil = require('../utils/time_util')
const logger = require('../utils/log').logger

router.get('/test', async (req, res, next) => {
  try {
    const data = `${__filename}`
    res.json({ result: true, data: data })
  } catch (e) {
    next(e)
  }
})

module.exports = router
