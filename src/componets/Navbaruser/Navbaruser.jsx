import React, { useState } from 'react'
import { AppBar, Box, Button, IconButton, InputBase, TextField, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

let Mytoolbar = styled(Toolbar)({
  background: '#3f51b5'
})

export default function Navbaruser(props) {
  let [serach, setSearch] = useState('');

  function changeHandler(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
    //props.onValues(e.target.value);
  }
  function submitHandler(e) {
    e.preventDefault()
    props.onValues(serach);
  }

  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.setItem('x-auth-token', '');
    navigate('/');
  }

  return (
    <AppBar position='fixed'>
      <Mytoolbar>
        <Box display={'flex'} justifyContent={'space-between'} flex={1}>
          <Box display={'flex'}>
            <Box display={'flex'}>
              <Link to='/products'><Button variant="contained"><HomeRoundedIcon />HOME</Button></Link>
            </Box>

          </Box>
          <Box bgcolor={'white'} width={390} borderRadius={1} display={'flex'} gap={2}>
            {/* <Button  color="secondary"> </Button> */}
            <Button variant="outlined" color="success" onClick={submitHandler}>
              <SearchIcon fontSize='medium' />
            </Button>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search with full name of the prodcut.."
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={changeHandler}
            />
            <SearchIcon />

          </Box>

          <Box display={'flex'} gap={2}>


            <Button variant="contained" onClick={logoutHandler}><LogoutIcon />Log out</Button>
          </Box>
        </Box>
      </Mytoolbar>
    </AppBar>
  )
}
