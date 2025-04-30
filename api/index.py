from flask import Flask, request, jsonify, send_from_directory #importamos nuestro directorio para ejecutar react en flask
from flask_cors import CORS

app = Flask(__name__, static_folder='../crud-react/dist', static_url_path="/")
CORS(app) 

#almacenar usuarios sin base de tados

users = [
    
    { 
        'id' : 1,
        'name':'adonis',
        'email':'adonis@gmail.com',
        'age': 25,
        'state': 1
    }
    
]

#contador para los id de usuarios
current_id = 2

# endpoint para las apis para el CRUD 

#endponint para el index.html iniciar react desde flask
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

#obtener usuarios creados

@app.route('/api/data/users', methods=['GET'])
def get_users():
    return {'users': users}


#crear usuarios

@app.route('/api/create/users', methods=['POST'])
def create_user():
    global current_id  
    new_user = request.get_json()
    if not new_user.get('name') or not new_user.get('email') or not new_user.get('age'):
        return jsonify({'error': 'Name, email and age are required'}), 400
    new_user['id'] = current_id
    current_id += 1
    new_user['state'] = 1
    users.append(new_user)
    return jsonify(new_user), 201

# actualizar usuarios

@app.route('/api/update/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # Obtener los datos enviados en la solicitud
    data = request.get_json()

    # Buscar el usuario por su ID en la lista
    user = next((user for user in users if user['id'] == user_id), None)

    # Si no se encuentra el usuario, devolver un error 404
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    # Actualizar los campos solo si están presentes en los datos enviados
    user['name'] = data.get('name', user['name'])
    user['email'] = data.get('email', user['email'])
    user['age'] = data.get('age', user['age'])

    # Devolver el usuario actualizado
    return jsonify(user), 200

# obtener usuarios en papelera

@app.route('/api/trass/users/<int:user_id>', methods=['GET'])
def get_trash_user(user_id):
    # Buscar el usuario por su ID en la lista
    trash_user = [user for user in users if user['state'] == 0 ]

    return jsonify({'trash':'trash_user'}) , 200


# enviar usuario a la papelera usuarios
@app.route('/api/trash/users/<int:user_id>', methods=['PATCH'])
def send_trash_user(user_id):
    # Buscar usuario por ID
    user = next((user for user in users if user['id'] == user_id), None)

    # Si no existe el usuario
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    # Enviar a papelera (cambiar estado a 0)
    user['state'] = 0
    return jsonify({'message': 'User sent to trash', 'user': user}), 200

# restaurar usuario de la papelera
@app.route('/api/restore/users/<int:user_id>', methods=['PATCH'])
def restore_user(user_id):
    # Buscar el usuario por su ID en la lista
    user = next((user for user in users if user['id'] == user_id), None)

    # Si no se encuentra el usuario, devolver un error 404
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    # Restaurar el usuario
    user['state'] = 1

    # Devolver el usuario restaurado
    return jsonify(user), 200

# eliminar usuario de la papelera
@app.route('/api/delete/users/<int:user_id>', methods=['DELETE'])
def delet_user(user_id):
    # Buscar el usuario por su ID en la lista
    user = next((user for user in users if user['id'] == user_id), None)

    # Si no se encuentra el usuario, devolver un error 404
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    # Eliminar el usuario de la lista
    users.remove(user)
    
    return jsonify({'message': 'User permanently deleted'}), 200


if __name__ == '__main__': 
    app.run(debug=True) #ejecutar el servidor en el puerto 5000