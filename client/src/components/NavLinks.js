import React from 'react'
import { Link, Stack} from '@mui/material'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const NavLinks = (props) => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const logout = () =>{
    setCookies('access_token', "")
    window.localStorage.clear()
    navigate("/login")
  }


  return (
    <Stack direction ={props.direction} spacing={2} margin={2}>
          <Link variant='h6' color='black' underline='none' href="/">HOME </Link> {/* Link from Material UI */}
          <Link variant='h6' color='black' underline='none' href="/about">ABOUT </Link>
          <Link variant='h6' color='black' underline='none' href="/contact">CONTACT </Link>
          <Link variant='h6' color='black' underline='none' href="/cart">CART </Link>
          {!cookies.access_token
           ? <Link variant='h6' color='black' underline='none' href="/login">LOGIN </Link>
            : <Link variant='h6' color='black' underline='none' onClick={logout} style={{cursor : "pointer"}}>LOGOUT </Link>
             }
          {cookies.access_token
           && <Link variant='h6' color='black' underline='none' href="/profile">PROFILE </Link>
           
             }
    </Stack>
  )

}

export default NavLinks
