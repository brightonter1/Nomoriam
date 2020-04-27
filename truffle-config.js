const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "turkey object eye invest brand top second debate misery school intact island";
module.exports = {
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/f770e2b03ba84a39abf119740db92bce");
            },
            network_id: 4,
            gas: 8200000
        }
    },
    compilers: {
        solc: {
          version: "0.4.25",
          settings: {
            optimizer: {
              enabled: true, // Default: false
              runs: 1000     // Default: 200
            },
            evmVersion: "homestead"  // Default: "byzantium"
          }
        }
      }
}