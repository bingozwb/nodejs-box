const mysql = require('mysql2/promise')
const logger = console

let CONFIG = ENVConfig
const db_config = {
  host: CONFIG.db.host,
  user: CONFIG.db.user,
  password: CONFIG.db.passwd,
  port: CONFIG.db.port,
  database: CONFIG.db.database,
  debug: CONFIG.db.debug,
  timezone: CONFIG.db.timezone,
  multipleStatements: CONFIG.db.multipleStatements,
}

const pool = mysql.createPool(db_config)
exports.pool = pool

exports.poolInfo = () => {
  let info = pool.pool ? pool.pool : pool

  logger.debug('pool.config ---------------------------------\n', info.config)
  logger.debug('pool._allConnections ---------------------------------\n',
    info._allConnections)
}
// this.poolInfo()

exports.getConnection = async () => {
  // return new Promise((resolve, reject) => {
  //   this.pool.getConnection(function (err, connection) {
  //     if (err) {
  //       reject(err)
  //     } else {
  //       resolve(connection)
  //     }
  //   })
  // })

  try {
    return await this.pool.getConnection()
  } catch (e) {
    throw e
  }
}

exports.exec = async (sql, values) => {
  if (CONFIG.db.show_sql) {
    logger.debug('sql', sql)
    logger.debug('values', values)
  }
// exports.exec = async (sql, values) => {
  // return new Promise((resolve, reject) => {
  //   this.pool.execute(sql, values, (err, results) => {
  //     if (err) {
  //       reject(err)
  //     } else {
  //       resolve(results)
  //     }
  //   })
  // })

  // return new Promise((resolve, reject) => {
  //   this.pool.execute(sql, values).
  //     then((results) => {resolve(results[0])}).
  //     catch(reject)
  // })

  try {
    return (await this.pool.execute(sql, values))[0]
  } catch (e) {
    throw e
  }
}

exports.query = async (sql, values) => {
  if (CONFIG.db.show_sql) {
    logger.debug('sql', sql)
    logger.debug('values', values)
  }

  try {
    return (await this.pool.query(sql, values))[0]
  } catch (e) {
    throw e
  }
}

