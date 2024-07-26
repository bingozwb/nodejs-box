const logger = require('../utils/log').logger
const jwt = require('jsonwebtoken')
const { MSG, KEY_ON_OFF_FN } = require('../common/constant')
const { getConfig } = require('../utils/sysConfig')

const JWT_SECRET = ENVConfig.jwt_secret

// auth JWT middleware
module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) {
        logger.error(MSG.ERROR_AUTH_ERROR)
        return res.json({ result: false, msg: MSG.ERROR_AUTH_ERROR })
      }
      req.uid = data.uid
      next()
    })
  } else {
    logger.error(MSG.ERROR_AUTH_REQUIRED)
    return res.json({ result: false, msg: MSG.ERROR_AUTH_REQUIRED })
  }
}

// function on-off status
module.exports.onOff = (defaultStatus, msg) => {
  return async (req, res, next) => {
    try {
      const fnName = req.originalUrl.split('?')[0].replace(/^\/|\/$/g, '').
        replace(/\//g, '_')
      const status = parseInt(
        await getConfig(KEY_ON_OFF_FN + fnName, defaultStatus || '0'))
      const errMSG = msg || MSG.SYSTEM_MAINTENANCE
      if (!status) {
        logger.error(`${fnName}: ${errMSG}`)
        return res.json({ result: false, msg: errMSG })
      }
      next()
    } catch (e) {
      next(e)
    }
  }
}

