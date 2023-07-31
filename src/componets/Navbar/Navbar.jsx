import styled from '@emotion/styled'
import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  let Mytoolbar = styled(Toolbar)({
    background: '#3f51b5'
  })


  return (
    <AppBar position='fixed'>
      <Mytoolbar>
        <Box display={'flex'} justifyContent={'space-between'} flex={1}>
          <Box display={'flex'}>
            <Typography>E-Shop</Typography>
            <ShoppingCart fontSize='large'></ShoppingCart>
          </Box>
          <Box display={'flex'} gap={2}>
            <Link to='/login'><Button variant="contained">Sign In</Button></Link>
            <Link to='/signup'><Button variant="contained">Sign Up</Button></Link>
          </Box>
        </Box>
      </Mytoolbar>
    </AppBar>
  )
}

export default Navbar