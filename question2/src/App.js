import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users.");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, users]);

  return (
    <div className="App">
      <h1>User Directory</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Search user by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filtered.map((user) => (
          <li key={user.id} onClick={() => setSelectedUser(user)}>
            <strong>{user.name}</strong> — {user.email}, {user.phone}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="modal">
          <h3>{selectedUser.name}</h3>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
          <p>Company: {selectedUser.company.name}</p>
          <p>Website: {selectedUser.website}</p>
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
