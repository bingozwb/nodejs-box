ENVConfig = require('./.env.' + process.env.chain)
const logger = console

const schedule = require('node-schedule')
const task_example = require('./task/task_example')

logger.debug('task >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

schedule.scheduleJob('0 0 1 * * *', task_example.start)

