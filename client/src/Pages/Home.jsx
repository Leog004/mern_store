import React from 'react'
import { Navbar, Announcements, Slider, Category, Products, Newsletter, Footer } from '../Components'

export default function Home() {
  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
      <Category />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}
