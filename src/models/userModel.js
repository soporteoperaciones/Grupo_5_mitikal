const fs = require('fs');
const path = require('path');

module.exports = {
    filename: path.resolve(__dirname, '../data/users.json'),
    readFile() {
        // Leer nuestra informacion
        const usersPath = this.filename;
        const usersJson = fs.readFileSync(usersPath, 'utf-8');
        // Parsear la informacion
        return JSON.parse(usersJson);
    },
    writeFile(newData) {
        // Pasar la data a json
        const dataJson = JSON.stringify(newData, null, 2);
        // Escribir el archivo
        fs.writeFileSync(this.filename, dataJson);
    },
    generateId() {
        const users = this.readFile();
        const lastUsers = users.pop();
        return lastUsers.id + 1;
    },
    findAll() {
        // Leer nuestra informacion
        const users = this.readFile();
        // devolver la info
        return users;
    },
    findByPk(id) {
        const users = this.readFile();
        // Filtrar por el ID
        const usersFound = users.find(user => user.id == id);
        // Devolvemos el usuario
        return usersFound;
    },
    findByField(field, value) {
        const users = this.readFile();
        // Filtrar por el [field]

        // [] los usamos para que sea dinámica el nombre de la propiedad
        const userFound = users.find(user => user[field] == value);
        // Devolvemos el user
        return userFound;
    },
    create(user) {
        user.id = this.generateId();

        // Leer el archivo
        const users = this.readFile();
        // Agregar nuestro planeta al array de planetas
        const usersUpdated = [...users, user];
        // Volver a escribir el archivo con el nuevo array de planetas
        this.writeFile(usersUpdated);
        return user;
    },
    update(data, id) {
        const Users = this.readFile();

        const newUsers = user.map(user => {
            if (user.id == id) {
                user = {
                    id: user.id,
                    ...data
                }
            }
            return user;
        });

        this.writeFile(newUsers);
    },
    destroy(id) {
        const users = this.readFile();

        const newUsers = users.filter(user => user.id != id);

        this.writeFile(newUsers);
    }
}