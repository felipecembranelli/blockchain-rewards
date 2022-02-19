//import { render } from '@testing-library/react';
import React, { Component } from "react"
import {useState} from 'react'
//import {ethers} from 'ethers'
import Web3 from 'web3'
import DaiToken from '../../abis/DaiToken.json'

class UserTransactions extends Component {

	constructor(props) {
		super(props);
		this.state = {

			errorMessage : '',
			currentNetworkId: '',
			defaultAccount: '',
			showAlert: false,
			transactions: []
		};  
	}

	
	async componentDidMount() {

		try {

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

		console.log("checking DAI balance");

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

			// TO-DO: add logic to get all user or contract tx

			let newTransaction1 = {blockNumber: "blockNumber", from: "from", to: "to", transactionHash: "transactionHash", gasUsed: "gasUsed"};
			let newTransaction2 = {blockNumber: "blockNumber", from: "from", to: "to", transactionHash: "transactionHash", gasUsed: "gasUsed"};
			let newTransaction3 = {blockNumber: "blockNumber", from: "from", to: "to", transactionHash: "transactionHash", gasUsed: "gasUsed"};
		  	
			let transList = this.state.transactions;
		  	
			transList.push(newTransaction1);
			transList.push(newTransaction2);
			transList.push(newTransaction3);
		  	
			this.setState({transactions: transList});

		} catch (error) {
			console.log(error.message)
		}

	}

	accountChangedHandler = (newAccount) => {
		this.setState({defaultAccount: newAccount[0]});
		
		console.log("reload");
		
		window.location.reload();
	}

  
  renderTableData() {

		return this.state.transactions.map((trans, index) => {
			const 	{blockNumber, from, to, transactionHash, gasUsed} = trans
			return (
				<tr key={transactionHash}>
					<td>{transactionHash}</td>
					<td>{from}</td>
					<td>{to}</td>
					<td>{blockNumber}</td>
					<td>{gasUsed}</td>
				</tr>
			)
		})
	}

	
	render() {
	return (
		<div>
				<table striped bordered hover size="sm">
					<thead>
						<td>TransactionHash</td>
						<td>from</td>
						<td>to</td>
						<td>blockNumber</td>
						<td>gasUsed</td>
					</thead>
					<tbody>
						{this.renderTableData()}
					</tbody>
				</table>
		</div>

	);
	}
}

export default UserTransactions;
