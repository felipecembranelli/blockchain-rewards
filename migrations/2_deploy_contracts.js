//const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
//const TokenFarm = artifacts.require('TokenFarm')
//const PyxisToken = artifacts.require('PyxisToken')

module.exports = async function(deployer, network, accounts) {
  // Deploy Pyxis token
  //await deployer.deploy(PyxisToken)
  //const pyxisToken = await PyxisToken.deployed()

  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy Dapp Token
  //await deployer.deploy(DappToken)
  //const dappToken = await DappToken.deployed()

  // Deploy TokenFarm
  //await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  //const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  //await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to HR
  await daiToken.transfer(accounts[0], '100000000000000000000')

  // Transfer 100 pyxis tokens to account 
  //await pyxisToken.transfer(accounts[1], '100000000000000000000')

  // Issuing Tokens
  await daiToken.issueTokens(accounts[1], '1000000000')
  await daiToken.issueTokens(accounts[2], '1000000000')

  // redeem
  //await daiToken.redeem(accounts[2], accounts[1], '1000000000')
}
