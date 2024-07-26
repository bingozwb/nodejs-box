const crypto = require('crypto');

// 定义一个函数来计算哈希值
exports.calHash = (...args) => {
  // 将所有参数转换为字符串并连接起来
  const data = args.map(arg => JSON.stringify(arg)).join('|');

  // 创建哈希对象，指定使用的算法
  const hash = crypto.createHash('sha256');

  // 更新哈希对象，传入数据
  hash.update(data);

  // 计算哈希值，指定输出格式为十六进制
  return hash.digest('hex');
}
