
function genCode(length) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

module.exports = {
  genCode: genCode
}

/*
// 示例：生成 10 位长度的随机字符串
const randomString = genCode(10);
console.log(randomString);
*/

