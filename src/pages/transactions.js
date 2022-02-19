import React from "react"

import { Provider } from "react-redux"

import store from "../store"
import BreadCrumb from "../components/shoppingCart/BreadCrumb"
import Layout from "../components/layout/Layout"
import SEO from "../components/seo/Seo"
import UserTransactions from "../components/web3Wrapper/transactions"

export default function TransactionsPage() {
  return (
    <Provider store={store}>
      <Layout>
        <SEO />
        <BreadCrumb current="Transactions" />
        <UserTransactions />
      </Layout>
    </Provider>
  )
}
