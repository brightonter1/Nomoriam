const HDwalletProvider = require('@truffle/hdwallet-provider')
export const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const mnemonic = "turkey object eye invest brand top second debate misery school intact island"
// const providerTransaction = new HDwalletProvider(mnemonic, "https://rinkeby.infura.io/v3/f770e2b03ba84a39abf119740db92bce")
const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/f770e2b03ba84a39abf119740db92bce"
)
const Nomoriam = require('./Nomoriam.json')

const web3 = new Web3(provider)


export const contractAddr = '0xB1Bbc754449B4689F99D5828b507c78581299271'
export const account = '0x51FF6Ea18b2895aaE622A59713fe179aB305d0d6'
export const privatekey = Buffer.from('3407760727BCCAE592B094CDB1F1302E4FB8CBBD4B897DB169001A9E7CD13F41', 'hex')
export const contractFetch = new web3.eth.Contract(Nomoriam.abi, contractAddr)




