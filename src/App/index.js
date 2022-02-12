import React from "react"

import Layout from "../components/layout/Layout"
import SEO from "../components/seo/Seo"

import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import HomeCarousel from "../components/carousel/HomeCarousel"
import Products from "../components/productsSection/Products"
import Benefits from "../components/benefits/Benefits"
import Recommended from "../components/recommendationSector/Recommended"
import Categories from "../components/categorySection/Categories"
//import Web3Wrapper from "../components/web3Wrapper/web3Wrapper"

const IndexPage = () => (
  <Layout>
    {/* <Web3Wrapper /> */}
    <SEO />
    <HomeCarousel />
    <Benefits />
    <Products />
    <Categories />
    <Recommended />
  </Layout>
)

export default IndexPage
