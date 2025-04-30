import React from 'react'

export default function SendListButton({userId, onUserUpdated}) {

    const sentToList = () => {

        if (!userId) {
            console.error('ID de usuario no proporcionado');
            return;
        }
        fetch(`https://crud-flask-react2.vercel.app/api/restore/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al enviar el usuario a la papelera');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Usuario restaurado:', data);
                // Llama a la función de actualización de usuario
                if (onUserUpdated) {
                    onUserUpdated(userId);
                }
            })
            .catch((error) => {
                console.error('Error en la conexión o en el servidor:', error.message);
            });
    }

  return (
    <>
        <button className=" btnRs btn " onClick={sentToList}>
            Restore
        </button>
    </>
  )
}
