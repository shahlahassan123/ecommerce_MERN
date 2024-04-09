import React, {useEffect, useState} from 'react'
import { Box, TextField, MenuItem, Typography } from '@mui/material'
import axios from 'axios'
import {useQuery} from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { selectAddress , addAddress } from '../slices/AddressSlice'

const AddressDropdown = () => {

  const dispatch = useDispatch();

  const [address, setAddress] = useState("")
   

    let userID = localStorage.getItem('userID')
    const fetchAddressByUsers = (userID) =>{
      // return axios.get(`http://localhost:9000/address/:${userID}`)
      return axios.get(`https://ecommerce-mern-u0y0.onrender.com/address/:${userID}`)
    }



    const addressList = useSelector(state => state.address.addresses)
  
    
    const [addresses, setAddresses] = useState([]); 

    useEffect(() => {
     
      const getAddressData = async () => {
        try {
          const response = await fetchAddressByUsers(userID);
          setAddresses(response?.data);
          
        } catch (error) {
          console.error('Error fetching addresses:', error);
          setAddresses([]);
        }
    }
    getAddressData()
  }, [addresses]);




const selectedNewAddress = useSelector(state=> state.address.selectedAddress)





useEffect(()=>{
  if(selectedNewAddress){
    const value = selectedNewAddress?.addressTitle
  
    setAddresses(()=> [...addresses, selectedNewAddress])
  
    setAddress(value)
    localStorage.setItem('address', JSON.stringify(selectedNewAddress))
  
  }
},[selectedNewAddress])
   

  
   
  


    const handleChange = (event) => { 
        const value = event.target.value
        setAddress(value)
        const res =addresses.filter(add=>add.addressTitle === value) 
        localStorage.setItem('address', JSON.stringify(...res))
         dispatch(selectAddress(...res)); 
    }

    

    
    
  
  return (
    <Box>
      <TextField
        label='Select Address'
        sx={{ width: "80%", margin: "5rem" }}
        select
        size='small'
        color='secondary'
        helperText='Please select your address'
        value={address}
        onChange={handleChange}>
        { addresses ? addresses.map((ad, i)=>{
            return(
                <MenuItem value={ad.addressTitle}>{ad.addressTitle}</MenuItem>
            )
        }) : <Typography>"No Address added"</Typography>}
      </TextField>
    </Box>
  )
}

export default AddressDropdown
