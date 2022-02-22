const MyToken = artifacts.require('MyToken')

const account_1_address = "0x282675d2b78fF4E10f60589da1bAa481d95E14D4"
const account_2_address = "0x5EeC097901bEcfe6F0013921398856E957CE42f3"

// How to run:
//  truffle exec ./scripts/issue-token.js 
//
module.exports = async function(callback) {

  let myToken = await MyToken.deployed()
  
  // Code goes here: logic to reward accounts...
  
  // earning 500 COINS
  await myToken.issueTokens(account_1_address, '500000000000000000000')

  // earning 500 COINS
  await myToken.issueTokens(account_2_address, '500000000000000000000')

  
  console.log("Tokens issued!")

  callback()
}