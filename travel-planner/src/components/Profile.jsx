import React from 'react'
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user?.username}</p>
      <p>Status: {user ? "Logged in ✅" : "Guest ❌"}</p>
    </div>
  );
}
