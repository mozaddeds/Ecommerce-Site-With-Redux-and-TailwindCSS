import React from 'react'
import Products from './Components/Products'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='bg-[#e4ebe3]'>
        <Products/>
      </div>
    </div>
  )
}

export default Home