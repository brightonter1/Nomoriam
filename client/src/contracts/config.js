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

export const contractAddr = '0x5C112A6a0148030152B0D18bdE84F17893067F7a'
export const contract = new web3.eth.Contract(Nomoriam.abi, contractAddr)

export const createTransaction = async data => {

    const txCount = await web3.eth.getTransactionCount(account)
    // Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        // to: account3,
        to: contractAddr,
        // value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        // gasLimit: web3.utils.toHex(21000),
        gasLimit: web3.utils.toHex(8000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei') * 1.5),
        data: data
    }
    

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

