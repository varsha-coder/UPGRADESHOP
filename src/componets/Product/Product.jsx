import React from 'react'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Mproduct from './Mproduct'
import Placingorder from '../Placingorder/Placingorder'

export default function Product() {
  return (
    <>
    <Box display={'flex'}>
    <Routes>
      <Route path='/' element={<Mproduct/>}/>  
    </Routes>
    </Box>
    
    </>
  )
}
