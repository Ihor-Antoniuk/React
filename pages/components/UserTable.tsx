import React from 'react';

type User = {
  _id: string;
  name: string;
  lastName: string;
  pass: string;
  city: string;
  country: string;
  zip: string;
};

type UserTableProps = {
  users: User[];
  onDeleteUser: (id: string) => void;
};

export const UserTable: React.FC<UserTableProps> = ({ users, onDeleteUser }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Country</th>
          <th>ZIP</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.city}</td>
            <td>{user.country}</td>
            <td>{user.zip}</td>
            <td>
              <button onClick={() => onDeleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};