const express = require('express')
const router = express.Router()
const util = require('util')
const bcrypt = require('bcrypt')
const asyncdb = require('../utils/mysqlUtil')
const logger = require('../utils/log').logger

router.post('/login', async (req, res, next) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const code = req.body.code

    let sql = util.format('SELECT * FROM admin_user WHERE `username` = "%s";',
      username)
    const result = await asyncdb.exec(sql)

    // check is user exist
    if (!result || result.length === 0) {
      return res.json({ result: false, msg: 'user not exist or wrong password!' })
    }

    // check is password matched
    if (!await bcrypt.compare(password, result[0]['password'])) {
      return res.json(
        { success: false, msg: 'user not exist or wrong password2!' })
    }

    // store user info in session
    req.session.admin_id = result[0]['id']

    res.json({ result: true })
  } catch (e) {
    next(e)
  }
})

router.post('/logout', async (req, res, next) => {
  try {
    req.session.admin_id = null
    res.json({ result: true })
  } catch (e) {
    next(e)
  }
})

router.get('/getUid', (req, res) => {
  res.json({ result: true, data: req.session.uid })
})

module.exports = router
