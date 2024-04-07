/**
 * ======================================================================
 * 【基本说明】：
 *
 * 【基本用法】：
 * var logger = require('./log').logger;
 * logger.info('Some log info......');
 * logger.deug('Some log info......');
 * logger.warn('Some log info......');
 * logger.error('Some log info......');
 * ======================================================================
 */

var log4js = require('log4js');

log4js.configure({
    appenders: [
        {// 控制台输出
            type: 'console',
            category: "console"

        },
        {// 日期文件格式
            type: "file",
            filename: '../log.log', // 此日志输出目录可按需设置，方便查看日志文件
            pattern: "_yyyy-MM-dd",
            maxLogSize: 20480,
            backups: 3,
            category: 'dateFileLog'
        }
    ],
    replaceConsole: true,   //替换console.log
    levels:{
        dateFileLog: 'debug',
        console: 'debug' // 调整此值控制日志输出级别，官方级别：OFF、FATAL、ERROR、WARN、INFO、DEBUG、TRACE、ALL
    }
});


var dateFileLog = log4js.getLogger('dateFileLog');
var consoleLog = log4js.getLogger('console');
exports.logger = consoleLog; // 使用consoleLog时日志将仅输出到控制台（与dateFileLog二选一）
