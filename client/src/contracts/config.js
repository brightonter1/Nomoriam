// const HDwalletProvider = require('@truffle/hdwallet-provider')
export const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
// const mnemonic = "turkey object eye invest brand top second debate misery school intact island"
// const providerTransaction = new HDwalletProvider(mnemonic, "https://rinkeby.infura.io/v3/f770e2b03ba84a39abf119740db92bce")
const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/f770e2b03ba84a39abf119740db92bce"
)
const Nomoriam = require('./Nomoriam.json')

export const web3 = new Web3(provider)


export const account = '0x51FF6Ea18b2895aaE622A59713fe179aB305d0d6'
export const privateKey = Buffer.from('3407760727BCCAE592B094CDB1F1302E4FB8CBBD4B897DB169001A9E7CD13F41', 'hex')

export const contractAddr = '0xA6cE85deFf8b503C318f22edcF5fa36E2c42c313'
export const contract = new web3.eth.Contract(Nomoriam.abi, contractAddr)

const Accounts = [
    {
        account: '0x51FF6Ea18b2895aaE622A59713fe179aB305d0d6',
        privateKey: Buffer.from('3407760727BCCAE592B094CDB1F1302E4FB8CBBD4B897DB169001A9E7CD13F41', 'hex')
    },
    {
        account: '0xd0FBBb11C57FF1E55f17b2e368B370981088C529',
        privateKey: Buffer.from('EE9F45D6775F25728E9A4272F7298F002AEF64F9BC20B830D4EFAC607E18B5B8', 'hex')
    },
    {
        account: '0x56A2Dc0DdEdec1955dd3825A10685A4ca500CAC9',
        privateKey: Buffer.from('0D4F8A0C9560E81CF66F297A84E4699049400E80248D1B5F177B343761C9F471', 'hex')
    },
    {
        account: '0x33736Ac5c5DAe46997D34d74B9994330B6A6a077',
        privateKey: Buffer.from('7BDCF81414D300455524CA5B8D7741CCEC39CCA1B98635F9EC49298459F771B1', 'hex')
    },
    {
        account: '0x35Cf3fee658A0C8B91cC459Ee3a7BF931acf79d3',
        privateKey: Buffer.from('5527377ECA2AF433B9E6BED3CB404B66E56326A653420BEF7DD2BAE2FD1ED6E6', 'hex')
    },
    {
        account: '0x89Ff393369594F6813Fa501392Ea985aC470756e',
        privateKey: Buffer.from('BBBB48993C471809133B7EF3EDE06104F87E894CFD5E862BFFCC1E45161734ED', 'hex')
    },
    {
        account: '0x4972219E3774996A58b4409d048Dae8D1257C7E4',
        privateKey: Buffer.from('7B3C99F39067C7FE556E5517D0D00D027987EE401B10973AF8D383C68E5C7A5E', 'hex')
    }
]

export const createTransaction = async data => {

    const account = Accounts[Math.floor(Math.random() * Accounts.length)]
    console.log(account)
    const txCount = await web3.eth.getTransactionCount(account.account)
    // Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        // to: account3,
        to: contractAddr,
        // value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        // gasLimit: web3.utils.toHex(21000),
        gasLimit: web3.utils.toHex(8000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
        data: data
    }
    // console.log(txObject)
    //       Sign the transaction
    const tx = new Tx(txObject, { 'chain': 'rinkeby' })
    tx.sign(account.privateKey)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

        //   Broadcast the transaction
    const txHash = await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        // console.log('txxHash: ', txHash)
        return txHash
    })

    return txHash.transactionHash
}

export const createAsyncTransaction = async data => {

    const txCount = await web3.eth.getTransactionCount(account)
    // Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        // to: account3,
        to: contractAddr,
        // value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        // gasLimit: web3.utils.toHex(21000),
        gasLimit: web3.utils.toHex(8000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
        data: data
    }
    // console.log(txObject)
    //       Sign the transaction
    const tx = new Tx(txObject, { 'chain': 'rinkeby' })
    tx.sign(privateKey)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

        //   Broadcast the transaction
    const txHash = await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        // console.log('txxHash: ', txHash)
        return txHash
    })

    return txHash.transactionHash


}

