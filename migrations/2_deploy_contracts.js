const MyToken = artifacts.require('MyToken')

module.exports = async function(deployer, network, accounts) {

  // Deploy Mock Token
  await deployer.deploy(MyToken)

  const myToken = await MyToken.deployed()

  // Transfer 1 milion COINS to admin
  console.log("Default Account:" + accounts[0])

  await myToken.transfer(accounts[0], '1000000000000000000000000')

  // Issuing Tokens (100 COINS)
  console.log("const account_1_address =" + accounts[1])

  await myToken.issueTokens(accounts[1], '100000000000000000000')

  console.log("const account_2_address =" + accounts[2])

  await myToken.issueTokens(accounts[2], '100000000000000000000')

}
