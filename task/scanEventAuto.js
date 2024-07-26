ENVConfig = require("../.env." + process.env.chain)

const ABI = require('../abi/abi')
const CHAIN_ID = ENVConfig.chain_id || 0
const IGNORE_ABI = ENVConfig.IGNORE_ABI || []
const IGNORE_EVENT = ENVConfig.IGNORE_EVENT || []
const AFTER_BLOCK_HEIGHT = ENVConfig.after_block_height || 0
const BLOCK_INTERVAL_TIME = ENVConfig.block_interval_time || 5000
const BLOCK_SCAN_GAP = ENVConfig.block_scan_gap || 1000
const BLOCK_SCAN_DELAY = ENVConfig.block_scan_delay || 0

const util = require('util')
const Web3 = require('web3')

const web3 = new Web3(ENVConfig.provider_scan || ENVConfig.provider)
const asyncdb = require('../utils/mysqlUtil')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  await exeScan()
}

async function exeScan() {
  // get scan_config
  const result = await asyncdb.exec(
    'SELECT * FROM `scan_config` WHERE chain_id = ?',
    [CHAIN_ID])

  for (const value of result) {
    // check chain id
    const chainId = value['chain_id']
    if (CHAIN_ID !== chainId) { continue }
    // get contract name, address & abi
    const contractName = value['contract_name']
    const contractAddress = value['contract_address']
    const status = value['status']
    if (contractAddress && status && IGNORE_ABI.indexOf(contractName) < 0) {
      doLoop(value).then(res => console.log('---------------------------------', contractName, contractAddress, res))
      console.log('+++++++++++++++++++++++++++++++++', chainId, contractName, contractAddress, status)
    }
  }
}

async function doLoop(value) {
  const id = value['id']
  const contractName = value['contract_name']
  const address = value['contract_address']
  const abi = ABI[contractName]

  const events = getEvents(abi)
  const contract = new web3.eth.Contract(abi, address)

  while (true) {
    try {
      // 如果进程中没有上次已查询区块 则查询数据库
      if (!process.env[contractName + address]) {
        const result = await asyncdb.exec(
          'SELECT from_block FROM scan_config WHERE id = ?',
          [id])
        process.env[contractName + address] = result[0]['from_block']
      }

      // 查詢當前最新區塊號前6个区块
      const fromBlock = parseInt(process.env[contractName + address])
      const blockHeight = (await web3.eth.getBlockNumber()) - AFTER_BLOCK_HEIGHT
      if (fromBlock >= blockHeight) {
        await sleep(BLOCK_INTERVAL_TIME)
        continue
      }
      const toBlock = Math.min(fromBlock + BLOCK_SCAN_GAP, blockHeight)

      // scan event logs
      const logs = await contract.getPastEvents('allEvents', {
        fromBlock: fromBlock,
        toBlock: toBlock
      })
      console.log(address, fromBlock, toBlock, logs.length)
      let sql = ''
      for (let j = 0; j < logs.length; j++) {
        const log = logs[j]
        // todo: validate match events
        if (!log.event) continue
        if (IGNORE_EVENT.indexOf(log.event) >= 0) continue
        if (address !== log.address) continue

        const eventAbi = events[log.event]
        const tableName = fromCamel('blog_' + contractName + '_' + log.event)
        const receipt = await web3.eth.getTransactionReceipt(log.transactionHash)
        const timestamp = (await web3.eth.getBlock(log.blockNumber)).timestamp
        // delay for rpc_url access rate limit
        await sleep(BLOCK_SCAN_DELAY)

        let sql0 = genSQL(tableName, eventAbi.inputs, log, receipt, timestamp)
        // console.log(sql0)
        sql += sql0
      }
      if (sql) {
        await asyncdb.query(sql)
      }

      // update from_block
      process.env[contractName + address] = toBlock + 1
      await asyncdb.exec(
        'UPDATE `scan_config` SET `from_block` = ? WHERE `id` = ?',
        [toBlock + 1, id])
    } catch (e) {
      console.error('doLoop:', e)
      await sleep(60000)
    }
  }
}

function fromCamel(str) {
  const hyphenateRE = /([^_])([A-Z]{1}[a-z])/g
  const hyphenateRE2 = /([^_,^A-Z])([A-Z]+)/g
  return str
    .replace(hyphenateRE, '$1_$2')
    .replace(hyphenateRE2, '$1_$2')
    .toLowerCase()
}

function getEvents(_abi) {
  let events = {}
  for (const o of _abi) {
    if (o.type === 'event') {
      events[o.name] = o
    }
  }
  return events
}

function genSQL(_table, _inputs, _log, _receipt, _timestamp) {
  let sql = 'insert ignore into ' + _table + ' values (0, "%s", "%s", %d, "%s", %d, %d, "%s", %d, %d, '
  const returnValues = _log.returnValues
  for (let i = 0; i < _inputs.length; i++) {
    const eol = i === _inputs.length - 1 ? ');' : ','
    if (_inputs[i].type === 'address') {
      sql = sql + '"' + returnValues[i] + '"' + eol
    } else if (_inputs[i].type.substr(-1, 1) === ']') {
      sql = sql + '"' + returnValues[i] + '"' + eol
    } else if (_inputs[i].type.substr(-2, 2) === '[]') {
      sql = sql + '"' + returnValues[i] + '"' + eol
    } else if (_inputs[i].type === 'tuple') {
      sql = sql + '"' + returnValues[i] + '"' + eol
    } else {
      sql = sql + returnValues[i] + eol
    }
  }
  return util.format(sql, _receipt.from, _receipt.to, null, _log.transactionHash, _log.blockNumber, _timestamp, _log.address, _receipt.transactionIndex, _log.logIndex)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
