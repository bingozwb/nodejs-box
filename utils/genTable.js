const fs = require('fs')


const IGNORE_ABI = []
const IGNORE_EVENT = ['Initialized', 'AdminWithdrawToken', 'AdminWithdrawNFT', 'AdminWithdraw', 'SetAdmin', 'SetAuth', 'SetIsPaused', 'Approval', 'ApprovalForAll', 'Update']


function genTable() {
  let str = ''
  str = str +
    'CREATE TABLE IF NOT EXISTS `scan_config` (\n' +
    '  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\n' +
    '  `contract_name` VARCHAR(255) NOT NULL COMMENT \'合约名称\',\n' +
    '  `contract_address` VARCHAR(255) NOT NULL COMMENT \'合约地址\',\n' +
    '  `from_block` BIGINT UNSIGNED DEFAULT NULL COMMENT \'起始区块\',\n' +
    '  `status` INT DEFAULT 1,\n' +
    '  PRIMARY KEY (`id`),\n' +
    '  UNIQUE KEY `uni_address` (`contract_address`)\n' +
    ') ENGINE=InnoDB AUTO_INCREMENT=0;\n' +
    '\n'

  try {
    const abi = require('../abi/abi.json')
    for (const name in abi) {
      if (IGNORE_ABI.includes(name)) {
        console.log('ignore name', name)
        continue
      }
      for (const item of abi[name]) {
        if (item.type !== 'event') continue
        if (IGNORE_EVENT.indexOf(item.name) >= 0) continue
        const tableName = fromCamel('blog_' + name.split('.')[0] + '_' + item.name)
        // str = str + 'DROP TABLE IF EXISTS `' + tableName + '`;\n' +
        str = str +
          'CREATE TABLE IF NOT EXISTS `' + tableName + '` (\n' +
          '  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\n' +
          '  `from` VARCHAR(255) NOT NULL COMMENT \'发送地址\',\n' +
          '  `to` VARCHAR(255) NOT NULL COMMENT \'接收地址\',\n' +
          '  `value` DECIMAL(64,0) DEFAULT NULL COMMENT \'交易数量\',\n' +
          '  `transaction_hash` VARCHAR(255) NOT NULL COMMENT \'交易哈希\',\n' +
          '  `block_number` INT UNSIGNED NOT NULL COMMENT \'区块号\',\n' +
          '  `timestamp` INT UNSIGNED NOT NULL COMMENT \'时间戳\',\n' +
          '  `address` VARCHAR(255) NOT NULL COMMENT \'合约地址\',\n' +
          '  `transaction_index` INT UNSIGNED NOT NULL COMMENT \'交易编号\',\n' +
          '  `log_index` INT UNSIGNED NOT NULL COMMENT \'日志编号\',\n'
        for (let input of item.inputs) {
          // convert to not keyword
          let fieldName = fromCamel(input.name)
          fieldName = input.name === 'from' ? 'from_address' : fieldName
          fieldName = input.name === 'to' ? 'to_address' : fieldName
          fieldName = input.name === 'value' ? 'value_num' : fieldName
          fieldName = input.name === 'id' ? 'id_num' : fieldName
          if (input.type.match(/uin.*[^\]]$/)) {
            str = str + '  `' + fieldName + '` DECIMAL(64,0) NOT NULL,' + '\n'
          } else if (input.type === 'bool') {
            str = str + '  `' + fieldName + '` BIT NOT NULL,' + '\n'
          } else {
            str = str + '  `' + fieldName + '` VARCHAR(255) NOT NULL,' + '\n'
          }
        }
        str = str +
          '  PRIMARY KEY (`id`),\n' +
          '  UNIQUE `uni_log` (`transaction_hash`, `log_index`)\n' +
          ') ENGINE=InnoDB AUTO_INCREMENT=0;\n' +
          '\n'
      }
    }
    // str = str + '\n'
  } catch (error) {
    console.error(error)
  }
  fs.writeFile('./sql/event.sql', str, err => {
    if (err)
      console.log('err', err)
  })
}

function fromCamel(str) {
  const hyphenateRE = /([^_])([A-Z]{1}[a-z])/g
  const hyphenateRE2 = /([^_,^A-Z])([A-Z]+)/g
  return str
    .replace(hyphenateRE, '$1_$2')
    .replace(hyphenateRE2, '$1_$2')
    .toLowerCase()
}

genTable()

