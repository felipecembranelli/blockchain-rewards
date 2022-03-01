const MyToken = artifacts.require('MyToken')

const partner_1_address ="0xC2D87A4e54D459e9C9724490568baB8C924ff338"
const partner_2_address ="0x971e0014FD80dE87AED4D17732A0e71D9F176253"

const member_1_address ="0xF977B4bc35c310fa9aC1Cd122671D1a513Da3f2a"
const member_2_address ="0x111fC81A4E0fAcC780840539efF0d2d18Cc5cFB7"

// How to run:
//  truffle exec ./scripts/issue-token.js 
//
module.exports = async function(callback) {

  let myToken = await MyToken.deployed()
  
  // Code goes here: logic to reward accounts...
  
  // earning 500 COINS
  await myToken.issueTokens(member_1_address, '500000000000000000000', partner_1_address)

  // earning 500 COINS
  await myToken.issueTokens(member_2_address, '500000000000000000000', partner_2_address)

  
  console.log("Tokens issued!")

  callback()
}