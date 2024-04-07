/*
hello express
 */

ENVConfig = require('./.env.' + process.env.chain)

const logger = require('./utils/log').logger

const path = require('path')

const express = require('express')
const cookieParser = require('cookie-parser')
//中间件--用于下发session
const session = require('express-session')
const RedisStore = require('connect-redis').default
const redis = require('./utils/redis')

const app = express()

// // view engine setup
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, './public')))

// 使用Redis存储session
const redisStore = new RedisStore({
  client: redis.getConnect(),
  prefix: 'admin:',
})
// 启用 session 中间件
app.use(session({
  store: redisStore,
  secret: 'adminwebsecret', // 相当于是一个加密密钥，值可以是任意字符串
  resave: false, // required: force lightweight session keep alive (touch)
  saveUninitialized: false, // recommended: only save session when data exists
  cookie: {
    maxAge: ENVConfig.failure_time * 1000, // 设置 session 的有效时间，单位毫秒
  },
}))

const index = require('./admin/index')
const adminTest = require('./admin/adminTest')
const adminInterrupter = require('./admin/interrupter')
const adminLogin = require('./admin/adminLogin')
const adminUser = require('./admin/adminUser')
const adminMenu = require('./admin/adminMenu')

const baseurl = ENVConfig.admin.baseurl
app.use(baseurl, index)
// use adminTest api only for dev
if (app.get('env') === 'development') {
  app.use(baseurl + '/admin', adminTest)
}
app.use(baseurl, adminInterrupter)
app.use(baseurl, adminMenu)
app.use(baseurl, adminLogin)
app.use(baseurl + '/users', adminUser)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.message = 'Not Found'
  next(err)
})

console.log('env', app.get('env'))
// global error handle
app.use((err, req, res, next) => {
  logger.error(req.url, err.name, err.message)
  logger.error('err.stack', err.stack)
  logger.error('err.status', err.status)

  if (res.headersSent) {
    return next(err)
  }

  if (app.get('env') === 'development') {
    res.status(err.status || 500).
      json({ msg: err.message || 'Internal Server Error' })
  } else {
    res.status(500).json({ msg: 'Internal Server Error' })
  }
})

/** start web app */
const port = ENVConfig.admin.port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
