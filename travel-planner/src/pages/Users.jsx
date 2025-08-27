import React, { useEffect, useReducer, useState } from 'react';
import { addUser, deleteUser, getUsers } from '../services/userService';
import { FaEdit, FaEye, FaTrash, FaUser } from 'react-icons/fa';
import "./Users.css";


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
}

function reducer(state, action) {
  switch (action.type) {
    case "FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // use reducer
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { firstName, lastName, email, password } = state;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const openModal = () => {
    setShowModal(true);
  }

  const handleChange = (field) => (e) => {
    localDispatch({ type: "FIELD", payload: { field, value: e.target.value } });
  }

  const closeModal = () => {
    localDispatch({ type: "RESET" });
    setShowModal(false);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addUser(state);
      const res = await getUsers();
      setUsers(res);
      closeModal();
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }

  }

  const deleteData = async (id) => {
    await deleteUser(Number(id));
    const res = await getUsers();
    setUsers(res);
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>
          Team <span className="user-count">{users.length} users</span>
        </h2>
        <button className="invite-btn" onClick={openModal}>+ Add</button>
      </div>

      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
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
                  <td className="action-buttons">
                    <button className="btn view-btn">
                      <FaEye /> View
                    </button>
                    <button className="btn edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="btn delete-btn" onClick={() => deleteData(u.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <form onSubmit={handleSave} className="login-form">
            <div className="modal">
              <h3>Add New User</h3>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={handleChange("firstName")}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange("lastName")}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange("email")}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange("password")}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}


    </div>
  );
}
