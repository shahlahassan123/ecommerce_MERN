import React from 'react'
import {useForm} from 'react-hook-form'
import {TextField, Stack, Button, Typography} from '@mui/material'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

const Register = () => {

  const [_,setCookies] = useCookies(['access_token']);
  const navigate = useNavigate()

  const {register, handleSubmit, formState: {errors}, watch} = useForm({
    defaultValues : {
      fullName : "",
      phone : "",
      email : "",
      password : "",
      confirmPassword : ""
    }
  })

  const password = watch('password')

  const validatePasswordLength = value =>{
    let result = value.length < 8 ? "Password must be atleast 8 characters !" : true
   return result
  }

  const validateConfirmPassword = value =>{
    let result = value !== password ? "Password and Confirm Password doesn't match !" : true
   return result
  }

  axios.defaults.withCredentials = true;
  const onSubmit = async (data) => {
    console.log("Register Data", data)
    try {
      // const response = await axios.post("http://localhost:9000/auth/register",
      const response = await axios.post("https://ecommerce-mern-u0y0.onrender.com/auth/register",
       { fullName: data.fullName, 
        phone: data.phone,
        email:data.email,
         password : data.password})
      console.log("Register response", response)
      setCookies('access_token', response.data.token)
      window.localStorage.setItem("registeredUserID", response.data.userID)
      navigate("/")
    } catch (err) {
      console.log(err)
    }

  }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' spacing={2}  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "3rem" }}>
        <Typography variant='h4'>New User ! Please Register</Typography>
        <TextField type='text' label="Full Name" sx={{ width: "80%" }}
          {...register('fullName', { required: "Required!" })}
          error={!!errors.fullName}
          helperText={errors?.fullName?.message}
        ></TextField>
        <TextField type='text' label="Phone" sx={{ width: "80%" }}
          {...register('phone', { required: "Required!" })}
          error={!!errors.phone}
          helperText={errors?.phone?.message}
        ></TextField>
        <TextField type='text' label="Email" sx={{ width: "80%" }}
          {...register('email', { required: "Required!" })}
          error={!!errors.email}
          helperText={errors?.email?.message}
        ></TextField>

        <TextField type='password' label="Password" sx={{ width: "80%" }}
          {...register('password', { required: "Required.!", validate : validatePasswordLength })}
          error={!!errors.password}
          helperText={errors?.password?.message}
        ></TextField>
        <TextField type='password' label=" Confirm Password" sx={{ width: "80%" }}
          {...register('confirmPassword', { required: "Required.!", validate : validateConfirmPassword })}
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        ></TextField>
        <Button variant='contained' type="submit" disabled={Object.keys(errors).length >0} >Register</Button>

      </Stack>
    </form>

   
  )
}

export default Register

