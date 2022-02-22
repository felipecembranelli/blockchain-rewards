import React from "react"
import { Container, Row, Col } from "reactstrap"

import "./Checkout.css"

import Web3 from 'web3'
import MyToken from '../../abis/MyToken.json'
import {config} from '../../data/defaultAccountConfig'

function IssueTokens(props) {

  const issueToken = async () => {
    console.log("issue token")

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
	
        //const provider = ganache.provider();
        const web3 = window.web3;
    
        //const accounts = await web3.eth.getAccounts()
        const accounts = await web3.eth.requestAccounts().then(console.log)

        let defaultAccount = accounts[0]
        let account_1 = accounts[1]
        let account_2 = accounts[2]

        console.log(defaultAccount)
        console.log(account_1)
        console.log(account_2)
      
        const networkId = await web3.eth.net.getId()

        console.log("checkout - networkId:" + networkId)

        // Load MyToken
//        const myTokenData = MyToken.networks[networkId]

        // if (myTokenData) {
        //   	const MyToken = new web3.eth.Contract(myToken.abi, myTokenData.address)
		   
			// TO DO:get accounts that will earn tokens and tokens qty 

			// let account_1_address = "0x75BA556958c7F315b5E178830fb01B1c510040D0"
			// let earned_tokens_1 = '10000'
			// let account_2_address = "0x68aE11Af84ecE5bf49e90904f1e5B8adE1Fb852a"
			// let earned_tokens_2 = '10000'

			// Code goes here: logic to reward accounts...
			//myToken.issueTokens(account_1_address, earned_tokens_1) // TO DO: nao esta reconhecendo o metodo

			//await myToken.issueTokens(account_2_address, earned_tokens_2)

      // let adminAccount = config.adminAccount

      //  myToken.methods.transfer(adminAccount, earned_tokens_1).send({ from: defaultAccount }).on('transactionHash', (hash) => {
      //     console.log("token issued")
      //   })

			console.log("Tokens issued!")

		 
		//   console.log("checkout - transfer:" + defaultAccount)

        //   let adminAccount = config.adminAccount

        //   console.log("checkout - transfer to:" + adminAccount)

        //   MyToken.methods.approve(defaultAccount, amount).send({ from: defaultAccount }).on('transactionHash', (hash) => {
        //     MyToken.methods.transfer(adminAccount, amount).send({ from: defaultAccount }).on('transactionHash', (hash) => {
        //       console.log("placed order")

        //       props.clearCart()
        //     })
        //   })

  //      } 
   //     else {
    //      window.alert('MyToken contract not deployed to detected network.')
     //   }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className="checkout-section pad">
      <Container>
        <form action="#" className="checkout-form" onSubmit={(event) => {
                event.preventDefault()
                //let amount
                
                //amount = props.total.toString()

				issueToken()
              }}>
          <Row className="justify-content-center">
            <Col lg="8">
                <div className="place-order">
                  <h4>Issue tokens</h4>
                  <div className="order-total">
                    <Row>
                      <Col md="12">
                        <div className="order-btn">
                          <button type="submit" className="site-btn place-btn">
                            Process
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  )
}

export default IssueTokens
