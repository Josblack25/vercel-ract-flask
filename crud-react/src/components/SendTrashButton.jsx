import React from 'react';

export default function SendTrashButton({ userId, onUserUpdated }) {
  // Función para enviar usuario a la papelera
  const sendToTrash = () => {
    if (!userId) {
      console.error('ID de usuario no proporcionado');
      return;
    }
    fetch(`https://vercel-ract-flask.vercel.app/api/trash/users/${userId}`, {
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
        console.log('Usuario enviado a la papelera:', data);
        // Llama a la función de actualización de usuario
        if (onUserUpdated) {
          onUserUpdated(userId);
        }
      })
      .catch((error) => {
        console.error('Error en la conexión o en el servidor:', error.message);
      });
  };

  return (
    <button className="btnSt btn btn-warning" onClick={sendToTrash}>
      Send to Trash
    </button>
  );
}
