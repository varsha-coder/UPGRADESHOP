import { ShoppingCart } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar/Navbar'

export default function Eshop() {
  return (
    <>
    <Navbar/>
   <Box marginTop={8} display={'flex'} justifyContent={'center'} alignItems={'center'} height={600}> 
    
    <Box bgcolor={'whitesmoke'} p={4} borderRadius={2}>
    <Typography variant='h1' color={'darkblue'}>E-SHOP <ShoppingCart sx={{ fontSize: 70 }} />  </Typography>
    </Box>
   
   </Box>
   </>
  )
}
