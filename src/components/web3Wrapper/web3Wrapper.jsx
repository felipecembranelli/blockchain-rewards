import React, { Component } from "react"
import {useState} from 'react'
import Web3 from 'web3'
import MyToken from '../../abis/MyToken.json'

class Web3Wrapper extends Component {

	constructor(props) {
		super(props);
		this.state = {

			errorMessage : '',
			currentNetworkId: '',
			defaultAccount: '',
			currentNetworkType: '',
			userBalance: 0,
			showAlert: false,
			myTokenBalance: '0',
			myToken: {},
		};  
	}

	
	async componentDidMount() {

		try {
			//window.ethereum.on('chainChanged', this.chainChangedHandler);

			window.ethereum.on('accountsChanged', this.accountChangedHandler);
		}
		catch(error){
			return	// not connect to metamask yet
		}
	}

	async componentWillMount() {

		await this.connectWalletHandler()
	}

	/**
	 * @desc Show error message
	*/ 
	setError = (errorMessage) => {
		console.log(errorMessage);
		this.setState({errorMessage: errorMessage});
		this.setState({showAlert: true});
	}

	/**
	 * @desc Check balance of user current account
	*/
	async connectWalletHandler() {

		console.log("checking COIN balance");

		try {
			if (window.ethereum) {
				window.web3 = new Web3(window.ethereum)
				await window.ethereum.enable()
			  }
			  else if (window.web3) {
				window.web3 = new Web3(window.web3.currentProvider)
			  }
			  else {
				window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
			  }
	
			const web3 = window.web3
	
			const accounts = await web3.eth.getAccounts()
			this.setState({ defaultAccount: accounts[0] })
		
			const networkId = await web3.eth.net.getId()

			console.log("componentWillMount - networkId:" + networkId)


			// Load MyToken
			const myTokenData = MyToken.networks[networkId]

			if (myTokenData) {
				const myToken = new web3.eth.Contract(MyToken.abi, myTokenData.address)
				
				this.setState({ myToken })

				let myTokenBalanceWEI = await myToken.methods.balanceOf(this.state.defaultAccount).call()

				let myTokenBalance = window.web3.utils.fromWei(myTokenBalanceWEI, 'Ether');

				console.log("Calculating DAI balance:", myTokenBalance.toString());

				this.setState({ myTokenBalance: this.roundNumber(myTokenBalance).toString() })

			} 
			else {
				window.alert('MyToken contract not deployed to detected network.')
			}
		} catch (error) {
			console.log(error.message)
		}
	}


	accountChangedHandler = (newAccount) => {
		this.setState({defaultAccount: newAccount[0]});
		
		console.log("reload");
		
		window.location.reload();
	}

	roundNumber = (amount) => {

		if(amount !== null && amount !== '') { 
			return Math.round(amount * 100) / 100
		}
		else {
			return 0;
		}
	}

	getReadableAccount = (account) => {

		if(account !== null && account !== '') {      
		console.log("Account Info=" + account)
		return "..." + account.substring(account.length - 4);
		}
		else {
		return "Not connected."
		}
	}
	
	render() {
	return (
		<div>
			<div>
				Account: {this.getReadableAccount(this.state.defaultAccount)}<br/>
				Balance: {this.state.myTokenBalance} CEM
			</div>
		</div>
	);
	}
}

export default Web3Wrapper;
