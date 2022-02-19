import React from "react"

import { Provider } from "react-redux"

import store from "../store"
import BreadCrumb from "../components/shoppingCart/BreadCrumb"
import Layout from "../components/layout/Layout"
import SEO from "../components/seo/Seo"
import IssueTokens from "../components/web3Wrapper/issueTokens"

export default function IssueTokensPage() {
  return (
    <Provider store={store}>
      <Layout>
        <SEO />
        <BreadCrumb current="Issue Tokens" />
        <IssueTokens />
      </Layout>
    </Provider>
  )
}
