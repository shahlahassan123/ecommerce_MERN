import React,{useState} from 'react'
import {useQuery} from 'react-query'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Grid, Box, Typography, Button, Stack} from '@mui/material'
import { addToCart , decreaseQuantity } from '../slices/CartSlice'

// const BASE_URL = "http://localhost:9000/products"
const BASE_URL = "https://ecommerce-mern-hc963njrh-shahlahassan123s-projects.vercel.app/products"

const fetchAllProducts = (categoryId) =>{
  return axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`)
}

const FetchProducts = ({ categoryId }) => {
    const { isLoading, data } = useQuery(['all-products', categoryId], () => fetchAllProducts(categoryId))
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartItems = useSelector(state => state.cart.cartItems);
    const [addedCart, setAddedCart] = useState([])
  
    // console.log("data", data)
  
    if (isLoading) {
      return <p>Loading</p>
    }
  
    const products = data.data
    // if(products.length >0 ){
    //   setHasProducts(false)
    // }else{
    //   setHasProducts(true)
    // }

  
    const handleAddToCart = (prod) => {      
      dispatch(addToCart(prod))
      
      setAddedCart([...addedCart, prod])
    //   navigate("/cart")
    }
  
  
    return (
      <Grid container rowSpacing={2} columnSpacing={2} p={3}>
        {products.map((prod, index) => (
            // <Grid item key={index} xs={5} md={2} style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid item key={index} xs={6} md={3} style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6' style={{ fontWeight: 'bold', paddingBottom: "1rem" ,height: '3rem'}}>{prod.title}</Typography>
            <Box style={{ flex: '1 0 auto' }}>
              <img src={prod.images[0]} alt={prod.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Box>
            <p style={{ marginTop: '8px' }}>{prod.description}</p>
            <p style={{ fontWeight: 'bold' }}>${prod.price}</p>
            {
              cartItems.includes(prod) ?
              <Stack direction="row">
                <Button variant='contained' color='primary' onClick={() => dispatch(addToCart(prod))} sx={{margin : "1rem", padding : "0"}} >+</Button>
                 {prod.cartQuantity}
                <Button variant='contained' color='primary' onClick={() => dispatch(decreaseQuantity(prod))}  sx={{margin : "1rem", padding : "0"}} >-</Button>
              </Stack>
              : <Button variant='contained' onClick={() => handleAddToCart(prod)}>Add to Cart</Button>
            }
             {/* <Button variant='contained' onClick={() => handleAddToCart(prod)}>Add to Cart</Button> */}
          </Grid>
        ))}
      </Grid>
    );
  }
  



export default FetchProducts

