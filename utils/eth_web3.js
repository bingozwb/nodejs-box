const Web3 = require('web3')
const web3 = new Web3(ENVConfig.provider)
inspectFunction = require('inspect-function');

async function nonce(from) {
    let _nonce
    if (process.env.nonce && process.env.nonce != "undefined") {
        _nonce = parseInt(process.env.nonce) + 1
        process.env.nonce = _nonce
    } else {
        _nonce = await web3.eth.getTransactionCount(from)
        // process.env.nonce = _nonce
    }

    return _nonce
}

async function sendSignedTxSimple(_to, _data, _pk, _value) {
    const from = web3.eth.accounts.privateKeyToAccount(_pk).address
    const _nonce = await nonce(from)
    let value = 0
    if (_value) {value = _value}
    const gasPrice = await web3.eth.getGasPrice()
    const gasLimit = 16000000

    const rawTx = {
        nonce: _nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        from: from,
        to: _to,
        value: value,
        data: _data
    }

    console.log("rawTx:", rawTx)
    const signedData = await web3.eth.accounts.signTransaction(rawTx, _pk)

    return await web3.eth.sendSignedTransaction(signedData.rawTransaction)
        .on('transactionHash', txHash => console.log('txHash', txHash))
        // .catch(error => console.error('sendSignedTx error:', inspectFunction(error)))
}

module.exports = {
    sendSignedTxSimple : sendSignedTxSimple,
}
