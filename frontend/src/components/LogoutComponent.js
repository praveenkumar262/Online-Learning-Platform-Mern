// src/components/LogoutComponent.js (or src/components/Common/LogoutComponent.js)
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Step 1: Clear JWT token from localStorage
        localStorage.removeItem('jwtToken');

        // Step 2: Redirect to login page
        navigate('/login');
    };

    const isAuthenticated = localStorage.getItem('jwtToken') ? true : false;

    return (
        <div>
            {isAuthenticated ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={() => navigate('/login')}>Login</button>
            )}
        </div>
    );
};

export default LogoutComponent;
