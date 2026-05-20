import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [showPassword, setShowPassword] = useState({});
    
    // Table data in object form
    const [users] = useState([
        {
            id: 1,
            name: "John Doe",
            dateOfBirth: "1990-05-15",
            email: "john.doe@example.com",
            password: "John@1990"
        },
        {
            id: 2,
            name: "Jane Smith",
            dateOfBirth: "1985-08-22",
            email: "jane.smith@example.com",
            password: "Jane@1985"
        },
        {
            id: 3,
            name: "Mike Johnson",
            dateOfBirth: "1992-11-10",
            email: "mike.johnson@example.com",
            password: "Mike@1992"
        },
        {
            id: 4,
            name: "Sarah Williams",
            dateOfBirth: "1988-03-18",
            email: "sarah.williams@example.com",
            password: "Sarah@1988"
        },
        {
            id: 5,
            name: "David Brown",
            dateOfBirth: "1995-07-25",
            email: "david.brown@example.com",
            password: "David@1995"
        },
        {
            id: 6,
            name: "Emily Davis",
            dateOfBirth: "1993-12-03",
            email: "emily.davis@example.com",
            password: "Emily@1993"
        },
        {
            id: 7,
            name: "Chris Wilson",
            dateOfBirth: "1991-09-14",
            email: "chris.wilson@example.com",
            password: "Chris@1991"
        }
    ]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/login');
        }
        
        if (loggedInUser) {
            setUserName(loggedInUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    const togglePasswordVisibility = (userId) => {
        setShowPassword(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const maskPassword = (password) => {
        return '•'.repeat(password.length);
    };

    return (
        <div id="homepage_container">
            {/* Navbar */}
            <nav id="homepage_navbar">
                <div id="homepage_welcomeSection">
                    <span id="homepage_welcomeText">Welcome,</span>
                    <span id="homepage_username">{userName || 'Guest'}</span>
                </div>
                <button id="homepage_logoutBtn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            {/* Main Content */}
            <div id="homepage_mainContent">
                <h1 id="homepage_title">User Management</h1>
                
                {/* Table */}
                <div id="homepage_tableContainer">
                    <table id="homepage_table">
                        <thead>
                            <tr>
                                <th>SL. No</th>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Email</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td data-label="SL. No">{index + 1}</td>
                                    <td data-label="Name">{user.name}</td>
                                    <td data-label="Date of Birth">{user.dateOfBirth}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="Password">
                                        <div id="homepage_passwordCell">
                                            <span id="homepage_passwordText">
                                                {showPassword[user.id] ? user.password : maskPassword(user.password)}
                                            </span>
                                            <button 
                                                id="homepage_togglePasswordBtn"
                                                onClick={() => togglePasswordVisibility(user.id)}
                                            >
                                                {showPassword[user.id] ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;