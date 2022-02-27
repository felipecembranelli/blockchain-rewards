const MyToken = artifacts.require('MyToken')

const account_1_address = "0x3A61842f606487628e54cEba4F331D64E6D253E6"
const account_2_address = "0x35B15A15814bdf39F896a512cB9907133155262c"

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