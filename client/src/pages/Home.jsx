import React from 'react'
import NavBar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import BlogCard from '../components/BlogCard'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <NavBar/>   
        <Header/>
        <BlogList/>
        <BlogCard/>
        <Newsletter/>
        <Footer/>
    </>
  )
}

export default Home