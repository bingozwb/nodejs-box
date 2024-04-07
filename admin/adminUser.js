const express = require('express')
const router = express.Router()
const util = require('util')
const bcrypt = require('bcrypt')
const asyncdb = require('../utils/mysqlUtil')
const logger = require('../utils/log').logger
const { check, validationResult } = require('express-validator')
const timeUtil = require('../utils/time_util')

router.get('/test', (req, res) => {
  res.send('test')
})

// add admin user
router.post(
  '/add',
  [
    check('username').
      isLength({ min: 1, max: 20 }).
      withMessage('length must in [1, 20]'),
    check('password').
      isLength({ min: 1, max: 20 }).
      withMessage('length must in [1, 20]'),
  ],
  async (req, res, next) => {
    try {
      // param check
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        logger.debug('param check errors', errors.array())
        return res.status(422).json({ result: false, msg: errors.array() })
      }

      const username = req.body.username
      const password = req.body.password

      let sql = util.format('SELECT * FROM admin_user WHERE `username` = "%s";',
        username)
      const result = await asyncdb.exec(sql)

      // check is user exist
      if (result && result[0]) {
        return res.
          json({ result: false, msg: 'user already exist!' })
      }

      // gen hashed password
      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(password, salt)

      // insert into db
      let sql_insert = util.format(
        'INSERT INTO admin_user (`username`, `nick`, `password`, `role`) VALUES ("%s", "%s", "%s", %d);',
        username, username, hashPassword, 2)
      await asyncdb.exec(sql_insert)

      res.json({ result: true })
    } catch (e) {
      next(e)
    }
  })

// change admin password
router.post(
  '/password_change',
  [
    check('old_password').
      isLength({ min: 1, max: 20 }).
      withMessage('length must in [1, 20]'),
    check('new_password1').
      isLength({ min: 1, max: 20 }).
      withMessage('length must in [1, 20]'),
    check('new_password2').
      isLength({ min: 1, max: 20 }).
      withMessage('length must in [1, 20]'),
  ],
  async (req, res, next) => {
    try {
      // param check
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        logger.debug('param check errors', errors.array())
        return res.status(422).json({ result: false, msg: errors.array() })
      }

      const { old_password, new_password1, new_password2, code } = req.body;
      const adminId = req.session.admin_id

      if (new_password1 !== new_password2) {
        return res.json({ result: false, msg: 'password not eq confirm_password!' });
      }
      if (new_password1 === old_password) {
        return res.json({ result: false, msg: 'the same as old_password!' });
      }

      let sql = 'SELECT * FROM admin_user WHERE `id` = ?'
      const result = await asyncdb.exec(sql, [adminId])

      // check is password matched
      if (!await bcrypt.compare(old_password, result[0]['password'])) {
        return res.json(
          { success: false, msg: 'wrong password!' })
      }

      // gen hashed password
      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(new_password1, salt)

      // update admin user
      const update_sql = 'UPDATE admin_user SET password=? WHERE id=?'
      await asyncdb.exec(update_sql, [hashPassword, adminId])

      res.json({ result: true })
    } catch (e) {
      next(e)
    }
  })

// router.get('/list', (req, res, next) => {
router.get('/qry', async (req, res, next) => {
  try {
    let data = []

    let sql = util.format('select * from admin_user where is_delete=0;')
    const result = await asyncdb.exec(sql)
    console.log('result', result)
    for (const item of result) {
      data.push({
        'id': item['id'],
        'create_date': timeUtil.formatTimestamp(item['create_date']),
        'username': item['username'],
        'nick': item['nick'],
      })
    }

    res.json({ result: true, data: data })
  } catch (e) {
    next(e)
  }
})

module.exports = router
