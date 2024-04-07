const logger = console
let CONFIG = ENVConfig

const ethers = require('ethers')

module.exports.contract = function (Addr, ABI) {
  let web3Provider = new ethers.providers.JsonRpcProvider(ENVConfig.provider)
  let signer = new ethers.Wallet(ENVConfig.pk, web3Provider)

  let contract = new ethers.Contract(Addr, ABI)
  return contract.connect(signer)
}

module.exports.initContract = (address, abi, signer = this.signer()) => {
  let contract = new ethers.Contract(address, abi)
  if (signer) { 
    contract = contract.connect(signer)
  }

  return contract
}

module.exports.signer = (pk = CONFIG.pk) => {
  if (!pk) { return }
  const provider = new ethers.providers.JsonRpcProvider(CONFIG.provider)
  const signer = new ethers.Wallet(pk, provider)
  return signer
}

module.exports.formatEther = function (v) {
  return ethers.utils.formatEther(v)
}

module.exports.parseEther = function (v) {
  return ethers.utils.parseEther(String(v))
}

module.exports.recoverAddress = async function (_str, _sign) {
  return ethers.utils.recoverAddress(_str, _sign)
}

module.exports.signMsgSolidity = async function (
  _types, _args, _pk = ENVConfig.pk) {
  const wallet = new ethers.Wallet(_pk)
  logger.log('wallet.address', wallet.address)
  const msg = ethers.utils.solidityKeccak256(_types, _args)
  const msg2 = ethers.utils.arrayify(msg)
  return await wallet.signMessage(msg2)
}

module.exports.signMsgHash = async function (_msg, _pk = ENVConfig.pk) {
  const wallet = new ethers.Wallet(_pk)
  logger.log('wallet.address', wallet.address)
  const msg = ethers.utils.keccak256(_msg)
  return await wallet.signMessage(msg)
}

module.exports.signMsg = async function (_msg, _pk = ENVConfig.pk) {
  const wallet = new ethers.Wallet(_pk)
  logger.log('wallet.address', wallet.address)
  return await wallet.signMessage(_msg)
}

module.exports.verifyMsg = function (_msg, _sign) {
  const msgHash = ethers.utils.keccak256(_msg)
  return ethers.utils.verifyMessage(ethers.utils.arrayify(msgHash), _sign)
}

module.exports.getBalance = async function (_account) {
  const provider = new ethers.providers.JsonRpcProvider(CONFIG.provider)
  return await provider.getBalance(_account)
}
