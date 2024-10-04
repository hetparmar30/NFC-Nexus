import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import '../components/Mycard.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QRCode from 'qrcode.react';
function Mycard() {
  const [data, setdata] = React.useState([]);
  const navigate = useNavigate();
  const [nocard, setnocard] = React.useState("");

  const handledelete = async () => {
    try {
      // Perform the DELETE request using Axios
      await axios.delete(`https://nfc-1.onrender.com/mycards/delete/${data[0]._id}`);

      // After successful deletion, refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  React.useEffect(() => {
    const token = Cookies.get('token-auth');

    const fetchData = async () => {
      try {
        const response = await axios.get('https://nfc-1.onrender.com/mycard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setdata(response.data);
        console.log(data)
        
      } catch (err) {
        alert('User not logged in');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  // Conditional rendering to handle initial empty state or undefined data[0]
  const renderCard = () => {
    if (data.length === 0) {
      return (
        <div className='nocard'>
          <div className="nocard-text">No card found</div>
          <button onClick={()=>{navigate('/createcard')}} className='nocard-button'>Create Card</button>
        </div>
      );
    } else if (!data[0]) {
      return (
        <div>No card data available.</div>
      );
    } else {
      return ( 
        <div className="outer-main">
          <Link to={'/mycard/'+data[0]._id} className='outer-link'> 
          <div className="card">
            <div className="upper">
              <div className="left">
                <img height={40} width={80} src="logo.png" alt="" />
                <div className="text">VISCO</div>
              </div>
              <div className="right">
                <img height={40} width={40} src="nfc.png" alt="" />
              </div>
            </div>
            <div className="lower">
              <div className="lower-left">

              <div className="username">{data[0].name} {data[0].surname}</div>
              <div className="description"><p>{data[0].description}</p></div>

              </div>

              <div className="lower-right">
                <div className="lower-image">
                <QRCode size={106} value={'https://viscocard.netlify.app/mycard/'+data[0]._id} />
                
                </div>


              </div>
              
            </div>
          </div>
          </Link>
          <div className="edit-delete">
          
              <button onClick={()=>{navigate('/mycard/edit/'+data[0]._id)}} className='edit'>{<EditIcon className='edit'/>}</button>

          
              <button onClick={handledelete} className='delete'>{<DeleteIcon className='delete'/>}</button>

           
          </div>
        </div>
        
     
      );
    }
  };

  return (
    <>
      {renderCard()}
    </>
  );
}

export default Mycard;
