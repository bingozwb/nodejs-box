const util = require('util')
const asyncdb = require('../utils/mysqlUtil')

async function getConfig (key, defaultValue = '') {
  let value = defaultValue

  const sql = util.format('select * from sys_config where `key`="%s"', key)
  const result = await asyncdb.exec(sql)
  if (result && result[0]) {
    value = result[0]['value']
  }

  if (!value) {
    throw Error(util.format('get_config: value not exits for key: %s', key))
  }

  return value
}

async function setConfig (key, value) {
  if (!key || !value) {
    throw Error(util.format('set_config: args must not None! key: %s, value: %s', key, value))
  }

  const sql_insert = util.format('replace into sys_config values("%s", "%s")', key, value)
  await asyncdb.exec(sql_insert)
}

module.exports = {
  getConfig: getConfig,
  setConfig: setConfig,
}