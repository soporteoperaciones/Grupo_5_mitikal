const express = require('express')
const path = require('path');
const app = express();

app.use(express.static('Public'));

app.listen(process.env.PORT || 3050, () => console.log('Servidor corriendo en el puerto 3050'));

app.get('/', function(req, res) {
    let htmlPath = path.resolve(__dirname, './Views/index.html')
    res.sendFile(htmlPath)
        //console.log(__dirname);
        //        res.send(producto);
});

app.get('/login', function(req, res) {
    let htmlPath = path.resolve(__dirname, './Views/login.html')
    res.sendFile(htmlPath)
});

app.get('/reset_account', function(req, res) {
    let htmlPath = path.resolve(__dirname, './Views/reset_account.html')
    res.sendFile(htmlPath)
});

app.get('/register', function(req, res) {
    let htmlPath = path.resolve(__dirname, './Views/register.html')
    res.sendFile(htmlPath)
});

app.get('/market', function(req, res) {
    let htmlPath = path.resolve(__dirname, './Views/market.html')
    res.sendFile(htmlPath)
});

app.get('/detalleProducto', function(req, res) {
    let htmlPath = path.resolve(__dirname, './Views/detalleProducto.html')
    res.sendFile(htmlPath)
});
app.get('/cart', function(req, res) {
    let htmlPath = path.resolve(__dirname, './Views/cart.html')
    res.sendFile(htmlPath)
});