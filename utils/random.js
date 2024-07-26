function genCode (length, characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}

function genCodeNum (length) {
  const characters = '0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}

function randomWeight (weights) {
  const totalWeight = weights.reduce((acc, cur) => acc + cur, 0)
  const randomValue = Math.random() * totalWeight
  let currentWeight = 0
  for (let i = 0; i < weights.length; i++) {
    currentWeight += weights[i]
    if (randomValue < currentWeight) {
      return i
    }
  }
}

module.exports = {
  genCode: genCode,
  genCodeNum: genCodeNum,
  randomWeight: randomWeight,
}

/*
// 示例：生成 10 位长度的随机字符串
const randomString = genCode(10);
console.log(randomString);
*/

