const BigNumber = require('bignumber.js')

const DEFAULT_DECIMAL = 4

function toUnit (num) {
  return toUnitX(num, DEFAULT_DECIMAL)
}

function toUnitX (num, decimals) {
  if (typeof decimals !== 'number' || !Number.isInteger(decimals)) {
    throw new TypeError('Decimals must be an integer.')
  }
  return BigNumber(num).times(10 ** decimals).integerValue(BigNumber.ROUND_FLOOR).toString()
}

function fromUnit (num) {
  return fromUnitX(num, DEFAULT_DECIMAL)
}

function fromUnitX (num, decimals) {
  if (typeof decimals !== 'number' || !Number.isInteger(decimals)) {
    throw new TypeError('Decimals must be an integer.')
  }
  return BigNumber(num).div(10 ** decimals).toString()
}

function fromPercent (num) {
  return BigNumber(num).div(100).toFixed(4, BigNumber.ROUND_FLOOR)
}

function toPercent (num) {
  return BigNumber(num).times(100).toFixed(2, BigNumber.ROUND_FLOOR)
}

module.exports = {
  toUnit: toUnit,
  toUnitX: toUnitX,
  fromUnit: fromUnit,
  fromUnitX: fromUnitX,
  toPercent: toPercent,
  fromPercent: fromPercent,
}

/**
// 示例用法
const num = 123.456;
const resultToUnit = toUnit(num);
const resultFromUnit = fromUnit(resultToUnit);
const resultToPercent = toPercent(num);
const resultFromPercent = fromPercent(resultToPercent);

console.log('Result toUnit:', resultToUnit);
console.log('Result fromUnit:', resultFromUnit);
console.log('Result toPercent:', resultToPercent);
console.log('Result fromPercent:', resultFromPercent);
*/
