
import Cookies from 'js-cookie';
import React from 'react';
import './Navigation.css';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({ username }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            Cookies.remove('token-auth');
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="user-profile">
            <button className="user-profile-btn">
                {username}
            </button>
            <div className="dropdown-content">
                <button className="dropdown-btn">Settings</button>
                <button className="dropdown-btn" onClick={() => navigate('/mycard')}>My Cards</button>
                <button className="dropdown-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dropdown;
