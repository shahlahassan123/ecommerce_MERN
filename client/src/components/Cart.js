import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Stack, Box, Typography, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell , MenuItem, TextField} from '@mui/material'
import { addToCart, decreaseQuantity , removeFromCart, updateCartTotalAmount} from '../slices/CartSlice'
import CloseIcon from '@mui/icons-material/Close';
import Address from './Address'
import { useNavigate } from 'react-router-dom';
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import AddressDropdown from './AddressDropdown';
import Modal from 'react-modal'
import zIndex from '@mui/material/styles/zIndex';


const Cart = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
 const cart = useSelector((state => state.cart))
 const navigate = useNavigate()
 
 const dispatch = useDispatch()
 let cartProducts = cart.cartItems

 console.log("CART", cartProducts)

 const totalPriceCalc = (sum, prod) =>{
  return sum + prod.qtyPrice
 }
    
 let totalPrice = cartProducts.reduce(totalPriceCalc, 0)
 dispatch(updateCartTotalAmount(totalPrice))

 console.log("price",cart.cartTotalAmount)
 const [cookies, setCookies] = useCookies(['access_token'])

 //Creating Orders in the Orders Collection
  const createOrder = async (orderData) => {
    try {
      // const response = await axios.post("http://localhost:9000/orders", orderData)
      const response = await axios.post("https://ecommerce-mern-hc963njrh-shahlahassan123s-projects.vercel.app/orders", orderData)
      return response.data
    }
    catch (err) { 
      console.log(err)
     }
  }

  const queryClient = useQueryClient();
  const mutation = useMutation(createOrder, {
    onSuccess : (data)=>{
      queryClient.invalidateQueries('Orders')
      console.log("Data", data)
    }
  })

 const handlePayment =async() =>{

  if(!cookies.access_token){
    navigate('/login');
  }else{
    const orderData = {
      products : cartProducts.map((prod)=>({
        title: prod.title,
        price: prod.price  ,
        quantity: prod.cartQuantity,
        quantityPrice: prod.qtyPrice
        // quantity: prod.cartQuantity = ""? 1: prod.cartQuantity,
        // quantityPrice: prod.qtyPrice = ""? prod.price: prod.qtyPrice
      })),
      totalPrice : cart.cartTotalAmount,
      address : JSON.parse(localStorage.getItem('address')) , 
      expectedDeliveryDate : Date.now(),
      userID : localStorage.getItem('userID')
      
    }
  console.log('Order Data', orderData)
  // mutation.mutate(orderData)
  const data = await mutation.mutateAsync(orderData); // response after posting data
 
  navigate("/order-confirmation", {state: {orderData: data}})
  localStorage.removeItem('address')
  }
 }

 let isAddressAdded 

 useEffect(()=>{
  isAddressAdded = localStorage.getItem('address') === ''
 },[isAddressAdded])

  return (
    <>
    <Stack direction='column' spacing={2} style={{padding : "1rem"}}>
      {cartProducts.length > 0 ? 
      <TableContainer>
        <Table aria-label='cartTable'>
          <TableHead>
            <TableRow>
              <TableCell><b>Product</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map((row)=>(
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>${row.qtyPrice}</TableCell>
                <TableCell>
                  <Button variant='contained' color='primary' onClick={() => dispatch(addToCart(row))} sx={{margin : "1rem", padding : "0"}} >+</Button>
                 {row.cartQuantity}
                  <Button variant='contained' color='primary' onClick={() => dispatch(decreaseQuantity(row))}  sx={{margin : "1rem", padding : "0"}} >-</Button>
                </TableCell>
                <TableCell><CloseIcon onClick={() => dispatch(removeFromCart(row))} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
      : <Typography>No items in the cart</Typography>
      
      }
      <Stack>
      <Box sx={{display : "flex", justifyContent : "flex-end"}}>
        
        {totalPrice !==0 && <Typography variant="h5">Total Price : ${totalPrice} </Typography>}
      </Box>
    </Stack>

    {/* <Address/> */}
        {cookies.access_token && !modalIsOpen && <AddressDropdown />}

        <Button variant='contained' type="submit" onClick={() => setModalIsOpen(true)}>Add New Address</Button>
        <Modal isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'grey'
            },
            content: {
              color: 'orange',
              zIndex: 1
            }

          }}
        // shouldCloseOnOverlayClick={false}
        >
          <Address setModalIsOpen={setModalIsOpen} />
        </Modal>
        {totalPrice !== 0 && <Button variant='contained' onClick={() => { handlePayment() }} disabled={isAddressAdded}>Proceed to Pay</Button>}
      </Stack>

    
    </>
    
  )
}

export default Cart



  