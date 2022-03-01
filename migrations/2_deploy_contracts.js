const MyToken = artifacts.require('MyToken')

module.exports = async function(deployer, network, accounts) {

  // Deploy Mock Token
  await deployer.deploy(MyToken)

  const myToken = await MyToken.deployed()

  // Transfer 1 milion COINS to admin
  console.log("Default Account:" + accounts[0])

  await myToken.transfer(accounts[0], '1000000000000000000000000')

  ////////////////////////////////////////
  // Partners: issuing Tokens to partners (1000 COINS)
  // but the token will not be added to the partner wallet. 
  // It is being stored inside the smart contract
  ////////////////////////////////////////
  console.log("const partner_1_address =" + accounts[1])

  await myToken.registerPartner(accounts[1], '1000000000000000000000')

  console.log("const partner_2_address =" + accounts[2])

  await myToken.registerPartner(accounts[2], '1000000000000000000000')

  ////////////////////////////////////////
  // Members: simulate initial earning process (100 COINS)
  ////////////////////////////////////////
  console.log("const member_1_address =" + accounts[3])

  await myToken.issueTokens(accounts[3], '100000000000000000000', accounts[1])

  console.log("const member_2_address =" + accounts[4])

  await myToken.issueTokens(accounts[4], '100000000000000000000', accounts[2])

}
