ENVConfig = require('../.env.' + process.env.chain)

const asyncdb = require('../utils/mysqlUtil')
const logger = require('../utils/log').logger
const { toUnit, fromUnit, toPercent, fromPercent } = require(
  '../utils/convert_unit')
const sysConfig = require('../utils/sysConfig')
const timeUtil = require('../utils/time_util')

async function handle_record () {
  try {
    logger.debug('handle_record ---------------------------------')
  } catch (e) {
    logger.error('Error task_pool: ', e.stack)
  }
}

// 启动任务
async function start () {
  logger.debug(`定时任务开始 - ${__filename} >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
  if (parseInt(await sysConfig.getConfig('task_example', '0'))) {
    await handle_record()
  }
}

module.exports = {
  start: start,
}
