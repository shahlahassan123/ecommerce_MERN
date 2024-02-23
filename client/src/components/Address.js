import React from 'react'
import {useForm} from 'react-hook-form'
import {TextField, Stack, Button, Typography} from '@mui/material'
import { addToCart } from '../slices/CartSlice'
import {useMutation, useQueryClient} from 'react-query'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import Modal from 'react-modal'
import { addAddress, selectAddress } from '../slices/AddressSlice'


const Address = ({setModalIsOpen}) => {

    const dispatch = useDispatch();

    //Adding address to DB using react query
    const createAddress = async (addressData) => {
        try {
            // const response = await axios.post("http://localhost:9000/address", addressData)
            const response = await axios.post("https://ecommerce-mern-sooty.vercel.app/address", addressData)
            return response.data
        }
        catch (err) {
            console.log(err)
        }
    }

    const queryClient = useQueryClient();
    const mutation = useMutation(createAddress, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('Address')
            console.log(" Address Data", data)
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            addressTitle : "",
            streetAddress: "",
            city: "",
            country: "",
            zip: "",
            phone: ""
        }
    })
    const onSubmit = (data) => {
        console.log(data)
        setModalIsOpen(false)
        localStorage.setItem('address', JSON.stringify(data))
        let addressData = {
            ...data,
            userID: localStorage.getItem('registeredUserID') || localStorage.getItem("userID")
        }
        mutation.mutate(addressData)
        dispatch(addAddress(addressData))
        // window.location.reload()
        dispatch(selectAddress(addressData))
        
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "3rem" }}>
                    <Typography variant='h4'> Add Address</Typography>
                    <TextField type='text' label="Address Title" sx={{ width: "80%" }}
                        {...register('addressTitle', { required: "Required!" })}
                        error={!!errors.addressTitle}
                        helperText={errors?.addressTitle?.message}
                    ></TextField>
                    <TextField type='text' label="Street Address" sx={{ width: "80%" }}
                        {...register('streetAddress', { required: "Required!" })}
                        error={!!errors.streetAddress}
                        helperText={errors?.streetAddress?.message}
                    ></TextField>

                    <TextField type='text' label="City" sx={{ width: "80%" }}
                        {...register('city', { required: "Required.!" })}
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                    ></TextField>
                    <TextField type='text' label="Country" sx={{ width: "80%" }}
                        {...register('country', { required: "Required!" })}
                        error={!!errors.country}
                        helperText={errors?.country?.message}
                    ></TextField>
                    <TextField type='text' label="Zip Code" sx={{ width: "80%" }}
                        {...register('zip', {
                            required: "Required!",
                            pattern: { value: /^\d+$/, message: 'Please enter a valid zip code with only numbers.' }
                        })}
                        error={!!errors.zip}
                        helperText={errors?.zip?.message}
                    ></TextField>
                    <TextField type='text' label="Phone" sx={{ width: "80%" }}
                        {...register('phone', {
                            required: "Required!",
                            pattern: { value: /^\d+$/, message: 'Invalid Phone Number' }
                        })}
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
                    ></TextField>
                    <Button variant='contained' type="submit" >Add Address</Button>
                </Stack>
            </form>


        </>
    )
}

export default Address
