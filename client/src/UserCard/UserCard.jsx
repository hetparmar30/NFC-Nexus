import React from 'react'
import '../UserCard/UserCard.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons library

function UserCard() {


    const [data, setdata] = React.useState([]);
    const navigate = useNavigate();
    const params = useParams();
 
 
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://nfc-1.onrender.com/mycard/'+params.id)
         setdata(response.data)      
        } catch (err) {
          alert('User not logged in');
          navigate('/login');
        }
      };
  
      fetchData();
    }, []);
  return <>

<div className="business-card">
      <div className="card-header">
        <div className="profile-image">
          <img src={data.profileimage} alt="Profile" />
        </div>
        <div className="personal-info">
          <h2>{data.name} {data.middlename} {data.surname}</h2>
          <p>{data.age} years old</p>
          <p>Date of Birth: {data.dateofbirth}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="contact-info">
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Address:</strong> {data.address}</p>
        </div>
        <div className="social-links">
          <a href={data.linkdin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} color="#2867B2" /></a>
          <a href={data.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook size={24} color="#3b5998" /></a>
          <a href={data.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter size={24} color="#1DA1F2" /></a>
          <a href={data.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram size={24} color="#C13584" /></a>
        </div>
        <div className="bio">
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  

  </>
}

export default UserCard