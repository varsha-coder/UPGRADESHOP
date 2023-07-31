import React from 'react'
import { AppBar, Box, Button, IconButton, InputBase, TextField, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AddHome } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

let Mytoolbar = styled(Toolbar)({
   background:'black'
})

export default function Navbaradmin() {
  return (
    <AppBar position='fixed'>
        <Mytoolbar>
           <Box display={'flex'} justifyContent={'space-between'} flex={1}>
            <Box display={'flex'}>
            
            <Box display={'flex'}>
            <Typography>Home</Typography>
            <AddHome></AddHome>
            </Box>
            </Box>
            <Box>
            Add Product
            </Box>

            <Box bgcolor={'white'} width={350} borderRadius={1} display={'flex'} gap={2}>
            <SearchIcon color='action' fontSize='large'/>
            </Box>

            <Box display={'flex'} gap={2}>
            <Link to='/'><Button variant="contained">Log out</Button></Link>
            </Box>
           </Box>
        </Mytoolbar>
      </AppBar>
  )
}
