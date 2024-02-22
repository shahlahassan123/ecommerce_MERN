import React, { useEffect } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './../slices/CartSlice.js';
import { useLocation } from 'react-router-dom';
import axios from 'axios'


const OrderConfirmation = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const cartTotalAmount = useSelector(state => state.cart.cartTotalAmount);

    
  const address = useSelector(state=>state.address.selectedAddress)
  const dispatch = useDispatch();

  
  const location = useLocation(); // to get the data passed in  navigate()
  const orderData = location?.state?.orderData



  useEffect(() => {
    dispatch(clearCart());
  }, []); 

  

  return (
    <Box
      sx={{
        border: '1px dashed black',
        margin: '2rem',
        padding: '1rem',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <CheckCircleIcon color="success" sx={{ padding: '1rem', fontSize: '4rem' }} />
      <Typography variant="h5" sx={{ paddingBottom: '2rem' }}>
       <b> Order confirmed !!
        #{orderData._id}</b>
      </Typography>
      <Typography>
      
      </Typography>
      <Stack direction="column" spacing={4}>
        {cartItems.map((prod, index) => {
          return (
            <Stack direction="row" spacing={3} sx={{ width: '100%' }}>
              <Box width="70%">
                <Typography variant="h6">{prod.title}</Typography>
              </Box>
              <Box width="15%">
                <Typography variant="h6">{prod.cartQuantity}</Typography>
              </Box>
              <Box width="15%">
                <Typography variant="h6">{prod.qtyPrice}</Typography>
              </Box>
            </Stack>
          );
        })}
        <Stack direction="row" spacing={3} sx={{ width: '100%', paddingBottom: '1rem' }}>
          <Box width="70%">
            <Typography variant="h6">
              <b>Total price :</b>
            </Typography>
          </Box>
          <Box width="15%">
            <Typography variant="h6"> </Typography>
          </Box>
          <Box width="15%">
            <Typography variant="h6">{cartTotalAmount}</Typography>
          </Box>
        </Stack>
        <Stack>
        <Typography variant="h6"><b>Delivery Address</b></Typography>
        <Typography variant="p"><b>Address Title : </b> {address.addressTitle}</Typography>
        <Typography variant="p"><b>Street Address : </b> {address.streetAddress}</Typography>
        <Typography variant="p"><b>City : </b>{address.city}</Typography>
        <Typography variant="p"><b>Country : </b>{address.country}</Typography>
        <Typography variant="p"><b>Zip Code : </b> {address.zip}</Typography>
        <Typography variant="p"><b>Phone : </b>{address.phone}</Typography>
        </Stack>

      </Stack>
    </Box>
  );
};

export default OrderConfirmation;



