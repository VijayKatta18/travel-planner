import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import { FaUser } from 'react-icons/fa';
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Team <span className="user-count">{users.length} users</span></h2>
        <button className="invite-btn">+ Add</button>
      </div>

      <div className="table-scroll">
        <table className="users-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>User Id</th>
              <th>Name</th>
              <th>Email address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td><input type="checkbox" /></td>
                <td>{u.userId}</td>
                <td className="user-info">
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.firstName} className="avatar" />
                  ) : (
                    <div className="avatar avatar-fallback"><FaUser /></div>
                  )}
                  <span className="user-name">{u.firstName} {u.lastName}</span>
                </td>
                <td>{u.email}</td>
                <td>
                  <select className="actions-select" defaultValue={u.permission}>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="view">View</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
