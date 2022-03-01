require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKey = "  173dd4b9336424162f4";
const endpointUrl = "https://kovan.infura.io/v3/bfb22c5059d542d5875eab79895530c8";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          //private keys array
          [privateKey],
          //url to ethereum node
          endpointUrl
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
