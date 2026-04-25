import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3003/users";

  // FETCH USERS
  const fetchUsers = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUsers(data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE USER
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.age) return;

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }

    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  // EDIT
  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} | {u.email} | {u.age}
            <button onClick={() => handleEdit(u)}>Edit</button>
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;