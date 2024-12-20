import React, { useState, useEffect } from 'react';
import { UserTable } from './UserTable';
import { AddUserForm } from './AddUserForm';
import axios from 'axios';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    };
    fetchAllUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    await axios.delete(`http://localhost:3001/api/users/${id}`);
    setUsers(users.filter(user => user._id !== id));
  };

  const handleAddUser = async (user: any) => {
    const response = await axios.post('http://localhost:3001/api/users', user);
    setUsers([...users, response.data]);
  };

  return (
   <div className="MainContainer">
      <h1>City Users</h1>
      <div className="UserTable">
        <UserTable users={users} onDeleteUser={handleDeleteUser} />
      </div>
      <div className="AddUserForm">
        <AddUserForm onAddUser={handleAddUser} />
      </div>
    </div>
  );
};

export default App;