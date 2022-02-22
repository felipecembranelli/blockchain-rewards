const DaiToken = artifacts.require('DaiToken')

module.exports = async function(deployer, network, accounts) {

  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Transfer 100 Mock DAI tokens to HR
  console.log("Default Account:" + accounts[0])

  await daiToken.transfer(accounts[0], '1000000000000000000000000')

  // Issuing Tokens (100 COINS)
  console.log("const account_1_address =" + accounts[1])

  await daiToken.issueTokens(accounts[1], '100000000000000000000')

  console.log("const account_2_address =" + accounts[2])

  await daiToken.issueTokens(accounts[2], '100000000000000000000')

}
