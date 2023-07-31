import { Box, Button, Card, Input, Paper, Rating, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbaruser from '../Navbaruser/Navbaruser';

export default function Productdetails() {
 let[details, setDetails] = useState({});
  let para = useParams();
  const navigate = useNavigate();
  
   useEffect(()=>{
    async function getData(){
      const response = await axios(`http://localhost:3001/api/v1/products/${para.id}`)
      const data = await response;
      setDetails(data.data);
    }
    getData();
   }, [])

function orderHandlerk(){
  navigate(`/oderplace/${para.id}`)
}
  
return (
    <>
    <Navbaruser/>

    <Box marginTop={8} display={'flex'} p={3} height={600} gap={5}> 
    <Card>
        <Box flex={1} bgcolor={'white'}>
       
            <img src={details.imageURL} 
            width={600} 
            height={500}
            >
            </img>
        </Box>
        </Card>
        <Card variant="outlined">
        <Box flex={2} paddingLeft={10} paddingTop={5} paddingRight={16}>
            <Typography variant='h3' color={'darkblue'} sx={{fontFamily:'cursive'}}>{details.name}</Typography>
            <Typography variant='h5'>{details.createdAt}</Typography>
            <Rating name="read-only" value={4} readOnly /> Ratings & Reviews
            <hr></hr>
            <Typography variant='p'>Special price</Typography>
            <Typography variant='h4' color={'green'}> {details.price}$</Typography>
            <Typography variant='p'>Category:</Typography>
            <Typography variant='h5' color={'darkblue'}>    {details.category}</Typography>
            
            <Typography variant='h6' > AvailableItems: {details.availableItems}</Typography>
            <hr></hr>
            <Typography color={'darkblue'}>Description</Typography>
            <Typography >{details.description}</Typography>
            <Typography >{details.updatedAt}</Typography>
            <hr></hr>
            <Box paddingLeft={3} display={'flex'} gap={2} marginBottom={3} p={2}>
                <Typography>Quanity:</Typography>
         <Box  width={200} height={30}>
         <TextField id='iteam-value'
         variant="standard"
         type='number'
         defaultValue={1}
         />
         </Box>
      </Box>
      
      <Box display={'flex'}  gap={3}>
        
     <Button variant="contained" color="success" onClick={orderHandlerk}>Place Order</Button>
     </Box>
        </Box>
        </Card>
    </Box>
    
    </>
  )
}
