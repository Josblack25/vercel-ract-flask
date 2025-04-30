import React from 'react'

export default function DeletUser ({UserId, onUserUpdated}) {

    // Función para eliminar usuario
    const deleteUser = () => {

        if (!UserId) {

            console.error('ID de usuario no proporcionado');
            return;
        }

        fetch(`https://crud-flask-react2.vercel.app/api/delete/users/${UserId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Usuario eliminado:', data);
            // Llama a la función de actualización de usuario
            if (onUserUpdated) {
                onUserUpdated(UserId);
            }
        })
        .catch((error) => {
            console.error('Error en la conexión o en el servidor:', error.message);
        });

    }

  return (
    <>
        <button className="btn btnDl" onClick={deleteUser}>
            Delet
        </button>
    </>
  )
}
