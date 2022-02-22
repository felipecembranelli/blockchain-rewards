const DaiToken = artifacts.require('DaiToken')

const account_1_address = "0x985919D5A883431f34fC95ac169B9889bde4f468"
const account_2_address = "0x121A2b2ba3A127cdf220D8CFE15D961582e9d138"

// How to run:
//  truffle exec ./scripts/issue-token.js 
//
module.exports = async function(callback) {

  let daiToken = await DaiToken.deployed()
  
  // Code goes here: logic to reward accounts...
  
  // earning 500 COINS
  await daiToken.issueTokens(account_1_address, '500000000000000000000')

  // earning 500 COINS
  await daiToken.issueTokens(account_2_address, '500000000000000000000')

  
  console.log("Tokens issued!")

  callback()
}