import React from 'react'
import FetchCategories from '../utils/FetchCategories.js'
import FetchProducts from './../utils/FetchProducts.js'
import Cart from './Cart.js'
import {Stack} from '@mui/material'
import Banner from './Banner.js'



const Home = () => {


  return (
    <Stack direction='column'>
      {/* <div style={{margin : "1rem", padding : "1rem"}}></div> */}
      <Banner></Banner>
      <div>
      <FetchCategories style={{margin : "1rem", padding : "1rem"}} />
      </div>
      
      {/* <Cart style={{width : '50%'}}></Cart> */}
    </Stack>
  )
}

export default Home
