const express = require('express')
const path = require ('path');
const app = express();

app.use(express.static('Public'));

app.listen(3050,() => console.log('Servidor corriendo en el puerto 3050'));

app.get('/', function (req, res) {
    let htmlPath = path.resolve(__dirname,'./views/index.html')
    res.sendFile(htmlPath)
    //console.log(__dirname);
    //        res.send(producto);
});

app.get('/login', function (req, res) {
    let htmlPath = path.resolve(__dirname,'./views/login.html')
    res.sendFile(htmlPath)
});

app.get('/reset_account', function (req, res) {
    let htmlPath = path.resolve(__dirname,'./views/reset_account.html')
    res.sendFile(htmlPath)
});

app.get('/register', function (req, res) {
    let htmlPath = path.resolve(__dirname,'./views/register.html')
    res.sendFile(htmlPath)
});

app.get('/market', function (req, res) {
    let htmlPath = path.resolve(__dirname,'./views/market.html')
    res.sendFile(htmlPath)
});