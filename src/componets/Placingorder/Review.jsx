import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
const body= {
  id:'62b186411e8e72621e2e96cd'
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Review(props) {
  const navigate = useNavigate();


  function orderClickHandler(){
    setOpen(true);
    props.goNext();
    setTimeout(()=>{
      navigate('/products');
    }, 1000)
  }

  const [addressArray, setAddressArray] =useState([]);
  let[refresh, setRefresh]=useState();
  let[obj, setObj] = useState({
  
})

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
          console.log('ll', data);
          setAddressArray(data)
          
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
        
   }, [])

   useEffect(()=>{
    console.log('working');
    const updated = addressArray.filter(val=>{
      return val.name === param.id;
    }

    )
     setObj(updated[0]);
   
   },[addressArray])



   const param =  useParams();
  const [open, setOpen]=useState(false);


  return (
    <div>Review
      <Box  display={'flex'}gap={3} p={2}>
        <Button onClick={()=>{navigate(-1); props.goBack();}} color="secondary" variant='contained'>Back</Button>
        <Button color="success" variant='contained' 
        onClick={orderClickHandler}>Place order button</Button>  
        </Box>
        <Box display={'flex'} justifyContent={'center'} p={3}>
           
          <Paper>
            <Box  display={'flex'} justifyContent={'center'}><Typography sx={{fontFamily:'cursive', color:'darkblue'}}>ADDRESS DETAILS FOR THE ORDER</Typography></Box>
          <Box width={500}  p={3} >
            <Typography>Name: {obj && obj.name}   </Typography>
            <hr/>
            <Typography>Contact Number: {obj && obj.contactNumber}</Typography>
            <hr/>
            <Typography>City: {obj && obj.city}     </Typography>
            <hr/>
            <Typography>Zip Code: {obj && obj.zipCode}     </Typography>
            <hr/>
            <Typography>Land Mark: {obj && obj.landmark}     </Typography>
            <hr/>
            <Typography>State:  {obj && obj.state}    </Typography>
            <hr/>
            <Typography>Street: {obj && obj.street}     </Typography> 
            </Box>
        
          </Paper>
        </Box>
      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
          Your order is confirmed <CheckCircleOutlineTwoToneIcon/>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
