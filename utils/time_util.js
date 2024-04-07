const TimeUtil = {
    // 将给定UNIX时间戳转换成指定格式字符串
    formatTimestamp: function (timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);

        return formattedDate;
    },

    // convert string to unix timestamp
    parseTimestamp: function (dataStr, format = 'YYYY-MM-DD HH:mm:ss') {
        return Math.floor(new Date(dataStr) / 1000)
    },

    // 获取当前时间的UNIX时间戳
    now: function () {
        return Math.floor(Date.now() / 1000);
    },

    // 获取当天0点UNIX时间戳
    midnight: function () {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Math.floor(midnight / 1000);
    },

    // 获取本周周一0点UNIX时间戳
    mondayMidnight: function () {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const mondayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
        return Math.floor(mondayMidnight / 1000);
    },
};

module.exports = TimeUtil

/**
// 示例用法
const currentTimestamp = TimeUtil.now();
const formattedTimestamp = TimeUtil.formatTimestamp(currentTimestamp);
const midnightTimestamp = TimeUtil.midnight();
const mondayMidnightTimestamp = TimeUtil.mondayMidnight();

console.log('Current Timestamp:', currentTimestamp);
console.log('Formatted Timestamp:', formattedTimestamp);
console.log('Midnight Timestamp:', midnightTimestamp);
console.log('Monday Midnight Timestamp:', mondayMidnightTimestamp);
console.log('Parsed Timestamp:', TimeUtil.parseTimestamp(formattedTimestamp))
*/
