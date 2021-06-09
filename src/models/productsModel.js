const fs = require('fs');
const path = require('path');

module.exports = {
    filename: path.resolve(__dirname, '../data/mitikal.json'),
    readFile() {
        // Leer nuestra informacion
        const productsPath = this.filename;
        const productsJson = fs.readFileSync(productsPath, 'utf-8');
        // Parsear la informacion
        return JSON.parse(productsJson);
    },
    writeFile(newData) {
        // Pasar la data a json
        const dataJson = JSON.stringify(newData, null, 2);
        // Escribir el archivo
        fs.writeFileSync(this.filename, dataJson);
    },
    generateId() {
        const products = this.readFile();
        const lastProducts = products.pop();
        return lastProducts.id + 1;
    },
    findAll() {
        // Leer nuestra informacion
        const products = this.readFile();
        // devolver la info
        return products;
    },
    findByPk(id) {
        const products = this.readFile();
        // Filtrar por el ID
        const productsFound = products.find(product => product.id == id);
        // Devolvemos el planeta
        return productsFound;
    },
    create(product) {
        product.id = this.generateId();

        // Leer el archivo
        const products = this.readFile();
        // Agregar nuestro planeta al array de planetas
        const productsUpdated = [...products, product];
        // Volver a escribir el archivo con el nuevo array de planetas
        this.writeFile(productsUpdated);
        return product;
    },
    update(data, id) {
        const products = this.readFile();

        const newProducts = product.map(product => {
            if (product.id == id) {
                product = {
                    id: product.id,
                    ...data
                }
            }
            return product;
        });

        this.writeFile(newProducts);
    },
    destroy(id) {
        const products = this.readFile();

        const newProducts = products.filter(product => product.id != id);

        this.writeFile(newProducts);
    }
}