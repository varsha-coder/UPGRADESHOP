import styled from '@emotion/styled'
import { Alert, Box, Button, Collapse, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

let Mytextbox = styled(TextField)({
  width: '100%',
})
let Mylink = styled(Link)({
  textDecoration: 'none'
})


function Login(props) {
  let [body, setBody] = useState({})

  function working(e) {

    let val = body;
    val[e.target.name] = e.target.value;
    setBody(val);
  }

  let navigate = useNavigate();
  let [open, setOpen]=useState(false);
  let [open_1, setOpen_1]=useState(false);
  let [msg, setMsg]=useState('');


  function onclickHandler(e) {
    e.preventDefault();
    console.log(body);

    axios.post('http://localhost:3001/api/v1/auth', body)
      .then(res => {
        setOpen_1(true);
        setTimeout(()=>{
          setOpen_1(false)
          navigate('/products');
        }, 1000)
        
       // console.log(res.headers);
        const axiosHeaders = res.headers;
        const authToken = axiosHeaders["x-auth-token"];
        localStorage.setItem('x-auth-token', authToken);
        //console.log(authToken);
      })
      .catch(err => {
        setOpen(true);
        setMsg(err.response.data);
        setTimeout(()=>{
          setOpen(false)
        }, 2000)
        console.log(err.response.data);
        localStorage.setItem('isAuthenticated', false)
      })

  }

  return (
    <>
     <Navbar/>
      <Box height={645} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} marginTop={5} gap={9}>
        <Box>
        <Collapse in={open}>
          <Alert variant="filled" severity="error">
            {msg}
          </Alert>
        </Collapse>
        <Collapse in={open_1}>
        <Alert variant="filled" severity="success">
          Logged in Sucuesfully!!
        </Alert>
        </Collapse>

        
        </Box>
        <Box bgcolor={'whitesmoke'} width={400} height={300} p={3} borderRadius={1}>
          <form onChange={working} onSubmit={onclickHandler}>
            <Stack gap={2}>
              <Box display={'flex'} justifyContent={'center'}><Typography variant='h6'>Log In</Typography></Box>
              <Mytextbox id="outlined-basic" label="Email" name='email' type='email' variant="outlined" required />
              <Mytextbox id="outlined-basic" label="Password" name='password' variant="outlined" required type='password' />
              <Button variant='contained' type='submit'>  Submit</Button>
              <Box display={'flex'} justifyContent={'center'} gap={1}>
                Are you a new user? <Mylink to='/signup'>Sign UP</Mylink></Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default Login