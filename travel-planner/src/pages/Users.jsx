import React, { useEffect, useState } from 'react'

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
         axios.get("");
    }, []);
  return (
    <div>
       <div>
      <h3>Users</h3>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
    </div>
  )
}
