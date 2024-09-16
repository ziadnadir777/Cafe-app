import React, { useState, useEffect } from 'react';
import './UserPage.css';

const UserPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the users from the backend (replace with your API call)
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleDelete = (id) => {
        // Call API to delete the user
        console.log(`Deleting user with id ${id}`);
    };

    return (
        <div className="user-page">
            <h2>Users</h2>
            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user-item">
                        <p>{user.username}</p>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;
