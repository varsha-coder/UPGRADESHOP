
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Eshop from '../EShop/Eshop'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Product from '../Product/Product'
import Productdetails from '../Productdetails/Productdetails'
import Placingorder from '../Placingorder/Placingorder'

///routing home page components...

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Eshop></Eshop> } />  
      <Route path='/login' element={ <Login/>}/>
      <Route path='/signup' element={ <Signup/>}/>
      <Route path='/products/*' element={ <Product/>}/>
      <Route path='/prductdetails/:id' element={<Productdetails/>}/>
      <Route path='/oderplace/*' element={<Placingorder/>}/>
      </Routes>
    </BrowserRouter>
  )
}
