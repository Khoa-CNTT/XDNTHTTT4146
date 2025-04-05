import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS, UPDATE_USER, DELETE_USER } from "./graphql/queries";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    variables: { page: 1, limit: 10 },
  });

  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUserStatus] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const handleDelete = (id) => {
    deleteUser({ variables: { id } }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const handleChangeStatus = (id, status) => {
    updateUserStatus({ variables: { id, status: !status } }).then(
      ({ data }) => {
        setUsers(
          users.map((user) => (user.id === id ? data.changeUserStatus : user))
        );
      }
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="overflow-x-auto mt-6">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleChangeStatus(user.id, user.status)}
                    className={`px-4 py-2 rounded ${
                      user.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
