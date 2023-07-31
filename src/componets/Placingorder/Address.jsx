import styled from '@emotion/styled';
import { Box, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Address(props) {
  const navigate = useNavigate();
  const [addressArray, setAddressArray] =useState([]);
  let [body, setBody] = useState({})
  let[passingValue, setPassingValue] = useState();

  function working(e) {

    let val = body;
    val[e.target.name] = e.target.value;
    setBody(val);
  }

let[refresh, setRefresh]=useState();

  function getAddressHandler(e) {
    e.preventDefault();
    const token = localStorage.getItem('x-auth-token');
    fetch('http://localhost:3001/api/v1/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary authentication headers
        'x-auth-token': token

        // e.g., 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        //console.log(data);
        alert('Sumbitted succesfully')
        setRefresh(1);
        
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  }

 useEffect(()=>{
  const token = localStorage.getItem('x-auth-token');
    fetch('http://localhost:3001/api/v1/addresses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary authentication headers
        'x-auth-token': token
        // e.g., 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
        setAddressArray(data)
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
 }, [refresh])


  let Mytextbox = styled(TextField)({

  })

  let[pair, setPair] = useState('');

  function chooseHandler(e){
     setPair(e.target.value);
     //console.log(e.target.value);
     setPassingValue(e.target.value);
     setButtonIndigator(true);
  }

  let [buttonIndigator, setButtonIndigator] =  useState(false);


  return (
    <div>Address page
      <Box display={'flex'}gap={10} p={3}>
      <Button onClick={() => { navigate(-1); props.goBack(); }} color="secondary" variant='contained'  >Back</Button>
      <Collapse in={buttonIndigator} >
   <Button onClick={() => { navigate(`/oderplace/review/${passingValue}`); props.goNext(); }} color="secondary" variant='contained' >Next</Button>
   </Collapse>
   </Box>
      <Box height={400} p={3} gap={10} display={'flex'} flexDirection={'column'}>
      <Box>
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Choose the address you will get the next button</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={pair}
    label="Age"
    onChange={chooseHandler}
  >
    {addressArray.map((name) => (
      <MenuItem key={name.contactNumber} value={name.name}>
       {name.name} - {name.contactNumber} - {name.city} - {name.zipCode}
      </MenuItem>
    ))}
  </Select>
</FormControl>
      </Box>
        <form onChange={working} onSubmit={getAddressHandler}>
          <Box><Typography variant='h6'>New User Add Address Here:</Typography></Box>
          <Mytextbox id="outlined-1" label="Name" name='name' variant="outlined" required />
          <Mytextbox id="outlined-2" label="Contact Number" name='contactNumber' type='number' variant="outlined" required />
          <Mytextbox id="outlined-3" label="City" name='city' variant="outlined" required />
          <Mytextbox id="outlined-4" label="Zip Code" name='zipCode' variant="outlined"  type='number' required />
          <Mytextbox id="outlined-6" label="Landmark" type='text' name='landmark' variant="outlined" required />
          <Mytextbox id="outlined-7" label="State" name='state' variant="outlined" required />
          <Mytextbox id="outlined-8" label="Street"name='street' variant="outlined" required />
          <Button variant='contained' type='submit' size='large'>Add Address</Button>
        </form>
      </Box>

    </div>
  )
}
