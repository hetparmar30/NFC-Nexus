import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Mycard from '../components/Mycard';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Home.css'


import Navigation from './Navigation';
function Home() {
 const navigate = useNavigate();
  const [username,setusername]= React.useState()
  React.useEffect(() => {
    // JWT token
    const token = Cookies.get('token-auth');
  
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nfc-1.onrender.com/mycard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data[0].name)
        setusername(response.data[0].name)
      
        
      
      } catch (err) {
          
        
      }
    };

    fetchData();
  }, []); 




  return  <div className="home">
    <div className="upper-screen">
 
  
    </div>
    
    
  </div>
  
}

export default Home