import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { imagedb } from '../CreateCard/firebase';

function Editcard() {
  const params = useParams();
  const navigate = useNavigate();
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [username, setUsername] = useState('');
  const token =
    Cookies.get('token-auth') ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://nfc-1.onrender.com/mycard/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { data } = response;
        setIsUserLogin(true);
        setUsername(data.username);
        setFormData({
          name: data.name,
          surname: data.surname,
          middlename: data.middlename,
          age: data.age,
          dateofbirth: data.dateofbirth,
          photogallery: data.photogallery,
          profileimage: data.profileimage,
          linkdin: data.linkdin,
          facebook: data.facebook,
          twitter: data.twitter,
          instagram: data.instagram,
          portfolio: data.portfolio,
          blog: data.blog,
          description: data.description,
          phone: data.phone,
          address: data.address,
          email: data.email
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [params.id, token]);

  const [formData, setFormData] = useState({
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const imgRef = ref(imagedb, `Fil/${uuidv4()}`);
    const file = e.target.files[0];

    await uploadBytes(imgRef, file);
    try {
      const data = await getDownloadURL(imgRef);
      setFormData((prevState) => ({
        ...prevState,
        profileimage: data
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await axios.patch(`https://nfc-1.onrender.com/mycard/edit/${params.id}`, formData, config);
      console.log(response.data);
      alert('Card updated successfully!');
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
      // Redirect to the updated card view or any other page
      navigate(`/mycard/${params.id}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating card');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Card Form</h2>
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
            <input placeholder="+91" type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
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
            <input
              type="file"
              className="form-control"
              name="photogallery"
              onChange={(e) => setFormData({ ...formData, photogallery: [...formData.photogallery, e.target.files[0]] })}
              accept="image/*"
              multiple
            />
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
            <textarea
              placeholder="ex-Web developer  app developer marketing agent etc.."
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Editcard;
