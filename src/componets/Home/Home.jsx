import React from 'react'
import Navbar from '../Navbar/Navbar';
import Navbaruser from '../Navbaruser/Navbaruser';

export default function Home(props) {
  
  var isAuthenticated  = localStorage.getItem("isAuthenticated");

  
    if (isAuthenticated == 'true') {
      return <Navbaruser/>;
        
      }
  else if(isAuthenticated==='false'){
        return <Navbar/>
  }
  return <Navbar />;
      
}
