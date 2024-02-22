
import React, {useState} from 'react'
import {AppBar, Toolbar, IconButton, Stack, Typography, Link, Drawer, Box, useMediaQuery} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NavLinks from './NavLinks';
// import {Link} from 'react-router-dom'

const NavBar = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width : 700px)')

  return (
    <div>
          <AppBar position="static">
              <Toolbar>     {/* Adds padding  */}
                  <Typography variant='h5' component='div' sx={{ flexGrow: 1 }} color='black'>ORDER ONLINE</Typography>
                  {!isSmallScreen && <Stack spacing={3} >
                      <NavLinks direction='row' />
                  </Stack>}
                  {isSmallScreen &&
                      (<Box>
                          <IconButton onClick={() => setIsDrawerOpen(true)} size='large'>
                              <MenuIcon />
                          </IconButton>
                      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} anchor='top'
                      PaperProps={{
                          style: {
                              background: 'transparent',
                              boxShadow: 'none',
                           
                          },
                      }} 
                      sx={{ backgroundColor: '#1976d2' }}
                      >
                              <Box sx={{display : 'flex', justifyContent : 'flex-end'}}>
                              <CloseIcon onClick={() => setIsDrawerOpen(false)} sx={{ cursor: 'pointer' }} />
                              </Box>
                              
                              <NavLinks direction='column' />
                          </Drawer>
                      </Box>)
                  }
              </Toolbar>
          </AppBar>
      
    </div>
  )
}

export default NavBar
