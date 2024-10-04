import React from 'react'
import '../CreateCard/Createcard.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import {imagedb} from '../CreateCard/firebase'
function Createcard() {
    const navigate = useNavigate()
    const [isUserLogin,setIsUserLogin] = React.useState(false);
    const [username,setusername] = React.useState()
    const token = Cookies.get('token-auth')||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const parts = token.split('.');
    const decodedPayload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    const parsedPayload = JSON.parse(decodedPayload);
  
    React.useEffect(() => {
      // JWT token
     
      
    
      // Function to fetch data
      const fetchData = async () => {
        try {
          const response = await axios.get('https://nfc-1.onrender.com/'+parsedPayload.userId, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIsUserLogin(true)
      setusername(response.data.username)
        
          
        
        } catch (err) {
  
           
           
          
        }
      };
  
      fetchData();
    }, []); 
   

    const [formData, setFormData] = React.useState({
        name: '',
        surname: '',
        middlename: '',
        age: '',
        dateofbirth: '',
        photogallery: [],
        profileimage: '',
        linkdin: '',
        facebook: '',
        twitter: '',
        instagram: '',
        portfolio: '',
        blog: '',
        description: '',
        phone: '',
        address: '',
        email: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleFileChange = async(e) => {

        
          const imgRef=  ref(imagedb,`Fil/${v4()}`)
          const file = e.target.files[0];
         
           await uploadBytes(imgRef,file);
           try{
          const data = await getDownloadURL(imgRef);
          console.log(data)
          setFormData(prevState => ({
            ...prevState,
            profileimage: data
          }));
        
       
           }
           catch(e)
           {
               console.log(e);
           }
       
              

       
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
       
        const config = {
          headers: {
           
            'Authorization': `Bearer ${token}`
          }
        };
    
        const formDataForUpload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'profileimage') {
            formDataForUpload.append(key, value);
          } else if (Array.isArray(value)) {
            value.forEach(item => formDataForUpload.append(`${key}[]`, item));
          } else {
            formDataForUpload.append(key, value);
          }
        });
    
        try {
          const response = await axios.post('https://nfc-1.onrender.com/createcard', formData, config);
          console.log(response.data);
          alert('Card created successfully!');
          // Optionally clear form after successful submission
          setFormData({
            name: '',
            surname: '',
            middlename: '',
            age: '',
            dateofbirth: '',
            photogallery: [],
            profileimage: '',
            linkdin: '',
            facebook: '',
            twitter: '',
            instagram: '',
            portfolio: '',
            blog: '',
            description: '',
            phone: '',
            address: '',
            email: ''
          });
        } catch (error) {
          console.error('Error:', error);
          alert('Error creating card');
        }
      };
    
      return (
        <div className="container mt-5">
          <h2 className="text-center mb-4">Create Card Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Name:</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label>Surname:</label>
                <input type="text" className="form-control" name="surname" value={formData.surname} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label>Middle Name:</label>
                <input type="text" className="form-control" name="middlename" value={formData.middlename} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Age:</label>
                <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label>Date of Birth:</label>
                <input type="text" className="form-control" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Phone:</label>
                <input placeholder='+91' type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Email:</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Address:</label>
                <textarea className="form-control" name="address" value={formData.address} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Profile Image:</label>
                <input type="file" className="form-control" name="profileimage" onChange={handleFileChange} accept="image/*" />
              </div>
              <div className="col-md-6">
                <label>Photo Gallery:</label>
                <input type="file" className="form-control" name="photogallery" onChange={(e) => setFormData({...formData, photogallery: [...formData.photogallery, e.target.files[0]]})} accept="image/*" multiple />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label>LinkedIn:</label>
                <input type="text" className="form-control" name="linkdin" value={formData.linkdin} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Facebook:</label>
                <input type="text" className="form-control" name="facebook" value={formData.facebook} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Twitter:</label>
                <input type="text" className="form-control" name="twitter" value={formData.twitter} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Instagram:</label>
                <input type="text" className="form-control" name="instagram" value={formData.instagram} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Portfolio:</label>
                <input type="text" className="form-control" name="portfolio" value={formData.portfolio} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Blog:</label>
                <input type="text" className="form-control" name="blog" value={formData.blog} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Description:</label>
                <textarea placeholder='ex-Web developer  app developer marketing agent etc..' className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
}





export default Createcard