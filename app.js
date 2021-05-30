const express = require('express')
const path = require('path');
const app = express();
const indexRoutes = require('./routes/indexRoutes')

app.use(express.static('./Public'));

app.set('views', path.join(__dirname, "Views"))

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

app.listen(process.env.PORT || 3050, () => console.log('Servidor corriendo en el puerto 3050'));

