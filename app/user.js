ENVConfig = require('../.env.' + process.env.chain)

const express = require('express')
const router = express.Router()
const util = require('util')
const asyncdb = require('../utils/mysqlUtil')
const logger = require('../utils/log').logger
const ethers = require('ethers')
const { check, validationResult } = require('express-validator')
const timeUtil = require('../utils/time_util')
const { toUnit, fromUnit, toPercent, fromPercent } = require(
  '../utils/convert_unit')
const { verifyMsg } = require('../utils/eth_ethers')

// user login by signature
router.post(
  '/login',
  [
    check('account').notEmpty(),
    check('signedMsg').notEmpty(),
  ],
  async (req, res, next) => {
    try {
      // param check
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        logger.debug('param check errors', errors.array())
        return res.status(422).json({ result: false, msg: errors.array() })
      }

      let account = req.body.account
      const signedMsg = req.body.signedMsg

      // convert to checksum_address
      account = ethers.utils.getAddress(account)

      // verify signature
      const signedAddress = verifyMsg(account, signedMsg)
      if (signedAddress !== account) {
        return res.status(401).
          json({ result: false, msg: 'verify signature failed!' })
      }

      // store user info in session
      req.session.uid = account

      res.json({ result: true })
    } catch (e) {
      next(e)
    }
  })

// user logout
router.post('/logout', (req, res, next) => {
  try {
    req.session.uid = null
    res.json({ result: true })
  } catch (e) {
    next(e)
  }
})

module.exports = router