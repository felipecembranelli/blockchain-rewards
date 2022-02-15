const DaiToken = artifacts.require('DaiToken')

const account_1_address = "0x75BA556958c7F315b5E178830fb01B1c510040D0"
const account_2_address = "0x68aE11Af84ecE5bf49e90904f1e5B8adE1Fb852a"

//truffle exec ./scripts/issue-token.js 
module.exports = async function(callback) {

  let daiToken = await DaiToken.deployed()
  
  // Code goes here: logic to reward accounts...
  await daiToken.issueTokens(account_1_address, '1000000000')

  await daiToken.issueTokens(account_2_address, '1000000000')

  
  console.log("Tokens issued!")

  callback()
}