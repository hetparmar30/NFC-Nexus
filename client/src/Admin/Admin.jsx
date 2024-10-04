import axios from 'axios'
import Cookies from 'js-cookie';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [userdata,setuserdata] = React.useState([])
    const privatekey = "01009";
    const navigate =useNavigate();

    React.useEffect(() => {
        
    
      
    
        const fetchData = async () => {
          try {

            if(privatekey!==Cookies.get('privatekey'))
            {
                navigate('/isadmin')

            }
            const response = await axios.get('https://nfc-1.onrender.com/admin');
            setuserdata(response.data)
         
           
            
          
          } catch (err) {
              console.log(err)
            
          }
        };
    
        fetchData();
      }, []); 




  return <>
  {userdata.map((prop)=>{
    return <>
    <div>
    {prop.username}
    {prop.email}

    </div>
   
    </>
  })}
   <button onClick={()=>{Cookies.remove('privatekey')}}>logout</button>
  </>
}

export default Admin