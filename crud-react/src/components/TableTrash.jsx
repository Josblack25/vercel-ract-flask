import React, { useState, useEffect } from "react";

import  DeletUser from "./DeletUser";
import SendListButton from "./SendListButton";

export default function TableList() {

    const [users , setUsers] = useState([]);


  useEffect(() => {
    fetch("https://vercel-ract-flask.vercel.app/api/data/users")
      .then((response) => response.json()) 
      .then((data) => { setUsers(data.users); })
      .catch((error) => console.error("Error fetching data:", error));
    }, []
  );

      // Función para actualizar el estado de los usuarios (mover a List)
      const updateUserState = (userId) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, state: 1 } : user
          )
        );
      };
  

    

  return (
    <>

      <div className=" lisTable borderColor flex items-center justify-center">
      
            <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                    .filter((user) => user.state === 0 ) // Filter users with state 1
                    .map((user) => (  
                    <tr key={user.id} className="hover:bg-base-300">
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>

                      <td>
                        <SendListButton userId={user.id} onUserUpdated={updateUserState}/>
                
                        <DeletUser UserId={user.id} onUserUpdated={updateUserState}/>
                      </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  );
}
