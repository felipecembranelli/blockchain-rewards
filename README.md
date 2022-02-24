# Loyalty Points with Blockchain and Ethereum

This is a sample implementation of a loyalty points system using blockchain and ethereum network, available for studying. 

The frontend applicatin was forked and adapted using the repository [e-shop](https://github.com/james-muriithi/e-shop).


## Features

- Metamask integration using web3.js
- Creates a fake cryptocurrency, using symbol CEM (refers to my last name "Cembranelli"), following [ERC-20](https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/) token standard
- Allows user to reedem products based on his wallet account balance
- Allows administrator to issue tokens (coins) to the users
## Stack

- [Truffle](https://trufflesuite.com/): This comes with a development environment, a testing framework, and a development blockchain.
- Solidity: used to develop the smartcontracts.
- [Web3.js](): A library for interacting with metamask and deployed smart contracts on the frontend.
- [Ganache](https://www.trufflesuite.com/ganache): A development blockchain for deploying smart contracts and inspecting state during development,
- [React.js](https://reactjs.org/): A framework for building user interfaces.
- [Metamask](https://metamask.io/): A wallet for user private keys management.

## 🚀 Quick start

> Install

To be able to run this app, you’ll need to have:

- Node.js.
- Truffle.
- Ganache development blockchain.
- Metamask chrome extension.

Note that we won’t need real Ether tokens as we will be using test Ether tokens from our development blockchain (Ganache). The complete code for this guide can be found here.

> Before you run the application

- Start your Ganache blockchain

![ganache](/doc/gananche.png)

- Deploy the smartcontract

Go to the root folder and run:

``truffle migrate``

This contract will create the cryptocurrency (CEM) with an initial total supply of 1 milion. It will then transfer this amount to the administrator account.

The contract will also issue tokens (100 CEM) to the first 2 users (accounts) on the Ganache blockchain. The users then can use the tokens to reedem products.

![smartcontract](/doc/xxx.png) 

- Setup the administrator account

Update the app administrator account on the file src/data/defaultAccountConfig.js, using the first Ganache account:

![ganache](/doc/gananche.png)

The administrator account will be responsible for issuing tokens to the users redeem the products. 

> How setup the users

Update the user accounts on the file src/contracts/issue-token.js with the 2 first accounts on the Ganache:

![users setup](/doc/x.png)

> How to run

```
$ git clone https://github.com/felipecembranelli/loyalty-points-evm.git
$ npm install
$ npm start
```

> Then in your browser go to [http://localhost:8000/](http://localhost:8000/)


> How to issue more tokens

Run the following script. It is simulating the token issues that could be done automatically in a pre-defined period of time (ex: monthly):

``truffle exec ./scripts/issue-token.js``

## Versions used in this demo

* ??

## Licence

[0BSD](LICENSE)
