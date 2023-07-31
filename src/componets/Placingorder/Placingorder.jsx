import { Box, Button, Modal, Step, StepLabel, Stepper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import Navbaruser from '../Navbaruser/Navbaruser';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Selected from './Selected';
import Address from './Address';
import Review from './Review';

export default function Placingorder() {
  const steps = [
    'Selected Prodect',
    'User Address',
    'Place order button',
  ];
  const navigate = useNavigate();
  let [stepActive, setStepActive] = useState(0);
  const nextSetp =()=>{
    setStepActive(stepActive+1);
  }
  const backStep=()=>{
    setStepActive(stepActive-1)
  }

  return (

    <>
      <Navbaruser />

      <Box marginTop={8} display={'flex'} flexDirection={'column'}>
        <Box height={500} p={1}>
          <Routes>
            <Route path='/:id' element={<Selected goNext={nextSetp}/>} />
            <Route path='/address' element={<Address goNext={nextSetp} goBack={backStep}   />} />
            <Route path='/review/:id' element={<Review goNext={nextSetp} goBack={backStep} />} />
          </Routes>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={stepActive} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>


      </Box>
    </>
  )
}
