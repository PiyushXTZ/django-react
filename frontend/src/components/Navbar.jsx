import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import "../styles/Navbar.css"; // Your Navbar styles

function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Assuming you store the username in localStorage when the user logs in
        const username = localStorage.getItem('username');
        if (username) {
            setUser(username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        window.location.href = '/login'; // Redirect to login
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">Home</Link>
                <Link to="/notes">Notes</Link>
            </div>
            <div className="navbar-right">
                {user ? (
                    <>
                        <span className="navbar-user">Welcome, {user}!</span>
                        <button onClick={handleLogout} className="btn logout-button">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="btn login-button">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;


