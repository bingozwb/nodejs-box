const DEFAULT_DECIMAL = 4;

function toUnit(num) {
  return toUnitX(num, DEFAULT_DECIMAL);
}

function toUnitX(num, decimals) {
  if (typeof decimals !== 'number' || !Number.isInteger(decimals)) {
    throw new TypeError('Decimals must be an integer.');
  }
  return parseInt(parseFloat(num) * 10 ** decimals);
}

function fromUnit(num) {
  return fromUnitX(num, DEFAULT_DECIMAL);
}

function fromUnitX(num, decimals) {
  if (typeof decimals !== 'number' || !Number.isInteger(decimals)) {
    throw new TypeError('Decimals must be an integer.');
  }
  return parseInt(num) / 10 ** decimals;
}

function fromPercent(num) {
  return parseFloat((parseFloat(num).toFixed(2)) / 100);
}

function toPercent(num) {
  return parseFloat((parseFloat(num).toFixed(4)) * 100);
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
