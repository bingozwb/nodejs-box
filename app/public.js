const express = require('express')
const router = express.Router()
const util = require('util')
const asyncdb = require('../utils/mysqlUtil')
const sysConfig = require('../utils/sysConfig')

// public info
router.get(
  '/info',
  async (req, res, next) => {
    try {
      let data = {}

      data.connected_wallets = await sysConfig.getConfig('connected_wallets',
        '0')
      data.liquidity_pool = await sysConfig.getConfig('liquidity_pool', '0')
      data.participant = await sysConfig.getConfig('participant', '0')
      data.revenue = await sysConfig.getConfig('revenue', '0')

      res.json({ result: true, data })
    } catch (e) {
      next(e)
    }
  })

module.exports = router