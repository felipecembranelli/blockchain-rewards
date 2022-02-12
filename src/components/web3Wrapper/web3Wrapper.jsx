//import { render } from '@testing-library/react';
import React, { Component } from "react"
import {useState} from 'react'
//import {ethers} from 'ethers'
import Web3 from 'web3'

class Web3Wrapper extends Component {

	constructor(props) {
		super(props);
		this.state = {

			errorMessage : '',
			currentNetworkId: '',
			defaultAccount: '',
			currentNetworkType: '',
			userBalance: 0,
			btnConnectState: false,
			showAlert: false
		};  
	}

	componentDidMount() {
		this.connectWalletHandler();

		try {
			window.ethereum.on('chainChanged', this.chainChangedHandler);

			window.ethereum.on('accountsChanged', this.accountChangedHandler);
		}
		catch(error){
			return	// not connect to metamask yet
		}
	}


	/**
	 * @desc Verify if the user is connected to Kovan network
	*/ 
	isKovanNetwork(chainID){
		if (chainID===42)
			return true;
		else
			return false;
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
	checkBalance(address) {

		console.log("checking balance");

		if ((typeof address === 'undefined') || (address === null)){
			this.setError("Account address not defined.");
			return;
		}

		try {
			const web3 = new Web3(window.ethereum);

			web3.eth.getBalance(address).then((balanceInWei) => {
				const balance = web3.utils.fromWei(balanceInWei);

				console.log("Balance in wei:", balanceInWei);
				console.log("Balance in ETH:", balance);

				this.setState({userBalance: balance});
			});
		} catch (error) {
			this.setError(error.message);
		}

		console.log("Balance in ETH:", this.userBalance);
	}
	

	getCurrentNetwork = () => {

		const web3 = new Web3(window.ethereum);

		web3.eth.net.getId()
		.then(networkId => {
			this.setState({currentNetworkId: networkId});
			this.btnConnectState=this.isKovanNetwork(networkId);
		});

		web3.eth.net.getNetworkType()
		.then(networkType => {
			this.setState({currentNetworkType: networkType});
		});
	}

	/**
	 * @desc Prompt metamask window
	*/
	promptMetamask = async () => {

		console.log('Prompting MetaMask!');

		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
	}

	/**
	 * @desc Verify if the user has the metamask configured,
	 * get network information and check account balance.
	*/
	connectWalletHandler = () => {

		if (window.ethereum && window.ethereum.isMetaMask) {

			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
			
				console.log(result[0]);
			
				this.setState({defaultAccount: result[0]});

				this.getCurrentNetwork();

				this.checkBalance(result[0]);

			})
			.catch(error => {
				this.setError(error.message);
			});

		} else {
			this.setError("Need to install MetaMask");
		}
	}

	/**
	 * @desc reload the page to avoid any errors with chain change 
	 * mid use of application
	*/
	chainChangedHandler = () => {
		window.location.reload();
	}

	accountChangedHandler = (newAccount) => {
		this.setState({defaultAccount: newAccount[0]});
	}

  getReadableAccount = (account) => {

    if(account !== null && account !== '') {      
      console.log("entrou no substring")
      console.log("account=" + account)
      return "..." + account.substring(account.length - 4);
    }
    else {
      return ""
    }
  }
	
	render() {
	return (
		<div>Account({this.getReadableAccount(this.state.defaultAccount)})</div>
	);
	}
}

export default Web3Wrapper;
