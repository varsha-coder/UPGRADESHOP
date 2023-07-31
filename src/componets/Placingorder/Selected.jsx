import { Box, Button, Card, CardContent, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export default function Selected(props) {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios(`http://localhost:3001/api/v1/products/${param.id}`)
      const data = await response;
      setDetails(data.data);
    }
    getData();
  }, [1])


  function nextHandler() {
    navigate('/oderplace/address/');
    props.goNext();
  }

  return (
    <div>
      Order details page:
      <Box display={'flex'} p={3}>
        <Button onClick={nextHandler} color="secondary" variant='contained'>Next </Button>
      </Box>

      <Box height={200} display={'flex'} justifyContent={'center'} marginTop={10} gap={1} >

        <Box bgcolor={'white'} width={300}>
          <Card variant="outlined">
            <img src={details.imageURL}
              width={300}
              height={250}
            >
            </img>
          </Card>
        </Box>
        <Box>
          <Paper elevation={3} >
            <Box width={300} height={200} p={3}>
              <Typography>Name:  {details.name}</Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
            
              </Typography>
              <hr/>
              <Typography>Qunitity: 1</Typography>
              <Typography>Price: {details.price}$</Typography>
              <Typography>{details.price}$ X 1</Typography>
              <Typography>Total Price: {details.price * 1}$</Typography>
            </Box>

          </Paper>

        </Box>
      </Box>
    </div>
  )
}
