import styled from '@emotion/styled'
import { Alert, Box, Button, Collapse, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

let Mytextbox = styled(TextField)({
  width: '100%',
})

let Mylink = styled(Link)({
  textDecoration: 'none',

})

function Signup() {

  let [body, setBody] = useState({})

  function working(e) {

    let val = body;
    val[e.target.name] = e.target.value;
    setBody(val);
  }

  const navigate = useNavigate();
  let [open, setOpen]=useState(false);
  let [open_1, setOpen_1]=useState(false);
  let [msg, setMsg]=useState('');

  function onclickHandler(e) {
    e.preventDefault();
    console.log(body);
    axios.post('http://localhost:3001/api/v1/users', body)
      .then(res => {
        console.log(res);
        setOpen_1(true);
        setTimeout(()=>{
          setOpen_1(false)
          navigate('/login');
        }, 1000)
        

      })
      .catch(err => {
        setOpen(true);
        setMsg(err.response.data);
        setTimeout(()=>{
          setOpen(false)
        }, 3000)
      })

  }



  return (
    <>
    <Navbar/>
      <Box height={645} display={'flex'} justifyContent={'center'} alignItems={'center'} marginTop={10} flexDirection={'column'} gap={3}>
        <Box>
          <Collapse in={open}>
            <Alert variant="filled" severity="error">
              {msg}
            </Alert>
          </Collapse>
          <Collapse in={open_1}>
            <Alert variant="filled" severity="success">
              You have registerd Sucuesfully!
            </Alert>
          </Collapse>

        </Box>

        <Box bgcolor={'whitesmoke'} width={400} height={500} p={3} borderRadius={1}>
          <form onChange={working} onSubmit={onclickHandler} >
            <Stack gap={2}>
              <Box display={'flex'} justifyContent={'center'}><Typography variant='h6'>Sign Up</Typography></Box>
              <Mytextbox id="outlined-1" label="First Name" name='firstName' variant="outlined" required />
              <Mytextbox id="outlined-2" label="Last Name" name='lastName' variant="outlined" required />
              <Mytextbox id="outlined-3" label="Email" name='email' variant="outlined" type='email' required />
              <Mytextbox id="outlined-4" label="Password" name='password' type='password' variant="outlined" required />
              <Mytextbox id="outlined-5" label="Contact Number" type='number' name='contactNumber' variant="outlined" required />

              <Button variant='contained' type='submit'>Submit</Button>

              <Box display={'flex'} justifyContent={'center'} gap={1}>
                Do you already have an account? <Mylink to='/login'>Log In</Mylink></Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default Signup