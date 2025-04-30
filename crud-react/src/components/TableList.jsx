import React, { useState, useEffect } from "react";

import ModalForm from "./ModalForm";
import ModalUpdate from "./ModalUpdate";
import SendTrashButton from "./SendTrashButton";

export default function TableList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  useEffect(() => {
    fetch("https://crud-flask-react2.vercel.app/api/data/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Función para actualizar el estado de los usuarios (mover a papelera)
  const updateUserState = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, state: 0 } : user
      )
    );
  };

  return (
    < >
      <div className="w-auto flex items-center flex-col lisTable ">

        <div className="flex justify-between items-center mt-10 ">
          {/* Add new users */}
          <ModalForm setUsers={setUsers} />

          {/* Input de búsqueda */}
          <div className="navbar-end">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto mr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualizar searchTerm
            />
          </div>
        </div>

        <div className=" lisTable flex items-center justify-center borderColor">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.filter((user) =>
                    user.state === 1 && // Filtrar usuarios con estado 1
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por el término de búsqueda
                )
                .map((user) => (
                  <tr key={user.id} className="hover:bg-base-300">
                    <td>{user.id}</td>
                    <td>
                      {user.name.length > 10
                        ? `${user.name.substring(0, 10)}...`: user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <ModalUpdate
                        usertoUpdate={user}
                        setUsers={setUsers}
                        modalId={`update_modal_${user.id}`}
                      />
                      {user.state === 1 && (
                        <SendTrashButton
                          userId={user.id}
                          onUserUpdated={updateUserState}
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
