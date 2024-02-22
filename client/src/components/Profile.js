import React from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Stack
} from '@mui/material'

const Profile = () => {

  let userID = localStorage.getItem('userID')

  const fetchOrdersByUsers = (userID) =>{
    return axios.get(`http://localhost:9000/orders/:${userID}`)
  }

  const { isLoading, data } = useQuery('orders-by-user',()=> fetchOrdersByUsers(userID));
  console.log("DATA USER ID ", data?.data)

  let orders = data?.data


  return (
    <>
      <Typography  sx={{ padding: "1rem" }} gutterBottom variant='h4' component='div' >
       <u>Orders</u> 
      </Typography>
      <Stack gap={3} sx={{ padding: "1rem" }}>
        {orders ?
          orders.map((order, index) => (
            <Stack width='100%' key={index} gap={5} sx={{ border: "3px solid #1976d2" }}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {index + 1}
                  </Typography>
                  {order.products.map((prod, ind) => (
                    <Typography variant='body2' color='text.secondary' key={ind}>
                      Product Name: {prod.title},
                      Product Price: {prod.price},
                      Product Qty: {prod.cartQuantity},
                      Product Total Price: {prod.qtyPrice}
                    </Typography>
                  ))}
                  <Typography variant='body2' color='text.secondary'>
                    Total Price: {order.totalPrice}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          )) : <Box>
            <Typography gutterBottom variant='h6' component='div'> No Orders placed yet.</Typography>
          </Box>
        }
      </Stack>
    </>

  );
}

export default Profile;


  