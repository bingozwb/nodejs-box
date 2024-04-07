const mysql = require('mysql')
const logger = console

const db_config = {
  host: ENVConfig.db.host,
  port: ENVConfig.db.port,
  database: ENVConfig.db.database,
  user: ENVConfig.db.user,
  password: ENVConfig.db.passwd,
  multipleStatements: true,
  debug: false,
  timezone: '08:00',
}
const pool = mysql.createPool(db_config)

exports.exec = function (sql, values) {
  if (ENVConfig.db.show_sql) {
    logger.debug('sql', sql)
    logger.debug('values', values)
  }
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.beginTransaction()
        connection.query(sql, values, (err, rows) => {
          if (err) {
            connection.rollback()
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
