import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../services/userService";
import { FaEdit, FaEye, FaTrash, FaUser } from "react-icons/fa";
import "./Users.css";

// 🔹 Define User type for data coming from API
export interface User {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // optional because API may not return it
  avatar?: string;
}

// 🔹 Define reducer state
interface State {
  id: number | null;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// 🔹 Initial state
const initialState: State = {
  id: null,
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// 🔹 Reducer actions
type Action =
  | { type: "FIELD"; payload: { field: keyof State; value: string | number } }
  | { type: "RESET" };

// 🔹 Reducer implementation
function reducer(state: State, action: Action): State {
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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // reducer
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { id, userId, firstName, lastName, email, password } = state;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [addUserData, setAddUserData] = useState<boolean>(false);
  const [viewData, setViewData] = useState<boolean>(false);
  const [editData, setEditData] = useState<boolean>(false);

  const isMounted = useRef<boolean>(true);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState<string>("");

  // clean up on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // auto focus on first name when modal open
  useEffect(() => {
    if (showModal && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [showModal]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res: User[] = await getUsers();
        setUsers(res);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setShowModal(true);
    setAddUserData(true);
    setViewData(false);
    setEditData(false);
  };

  const openViewModal = async (id: number) => {
    setShowModal(true);
    setViewData(true);
    setAddUserData(false);
    setEditData(false);

    const res: User = await getUser(id);

    if (res) {
      localDispatch({
        type: "FIELD",
        payload: { field: "firstName", value: res.firstName },
      });
      localDispatch({
        type: "FIELD",
        payload: { field: "lastName", value: res.lastName },
      });
      localDispatch({
        type: "FIELD",
        payload: { field: "email", value: res.email },
      });
    }
  };

  const openEditModal = async (id: number) => {
    setShowModal(true);
    setEditData(true);
    setAddUserData(false);
    setViewData(false);

    const res: User = await getUser(id);

    if (res) {
      localDispatch({ type: "FIELD", payload: { field: "id", value: res.id } });
      localDispatch({
        type: "FIELD",
        payload: { field: "userId", value: res.userId },
      });
      localDispatch({
        type: "FIELD",
        payload: { field: "firstName", value: res.firstName },
      });
      localDispatch({
        type: "FIELD",
        payload: { field: "lastName", value: res.lastName },
      });
      localDispatch({
        type: "FIELD",
        payload: { field: "email", value: res.email },
      });
    }
  };

  const handleChange =
    (field: keyof State) => (e: ChangeEvent<HTMLInputElement>) => {
      localDispatch({
        type: "FIELD",
        payload: { field, value: e.target.value },
      });
    };

  const closeModal = () => {
    localDispatch({ type: "RESET" });
    setShowModal(false);
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (addUserData) {
        const payload: User = { ...state, userId: "test" } as User;
        await addUser(payload);
      } else if (editData && id !== null) {
        await updateUser(id, state);
      }

      const res: User[] = await getUsers();
      setUsers(res);
      closeModal();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id: number) => {
    await deleteUser(id);
    const res: User[] = await getUsers();
    setUsers(res);
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>
          Team <span className="user-count">{users.length} users</span>
        </h2>

        <div className="actions-right">
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="invite-btn" onClick={openAddModal}>
            + Add
          </button>
        </div>
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
                <th>
                  <input type="checkbox" />
                </th>
                <th>User Id</th>
                <th>Name</th>
                <th>Email address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{u.userId}</td>
                  <td className="user-info">
                    {u.avatar ? (
                      <img src={u.avatar} alt={u.firstName} className="avatar" />
                    ) : (
                      <div className="avatar avatar-fallback">
                        <FaUser />
                      </div>
                    )}
                    <span className="user-name">
                      {u.firstName} {u.lastName}
                    </span>
                  </td>
                  <td>{u.email}</td>
                  <td className="action-buttons">
                    <button
                      className="btn view-btn"
                      onClick={() => openViewModal(u.id)}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className="btn edit-btn"
                      onClick={() => openEditModal(u.id)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteData(u.id)}
                    >
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
              {addUserData && <h3>Add New User</h3>}
              {viewData && <h3>User Details</h3>}
              {editData && <h3>Edit User</h3>}
              <input
                type="text"
                name="firstName"
                ref={firstInputRef}
                placeholder="First Name"
                value={firstName}
                onChange={handleChange("firstName")}
                readOnly={viewData}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange("lastName")}
                readOnly={viewData}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange("email")}
                readOnly={viewData}
                required
              />
              {addUserData && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange("password")}
                  required
                />
              )}
              <div className="modal-actions">
                {!viewData && (
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                )}
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
