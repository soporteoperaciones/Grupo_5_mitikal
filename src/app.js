const express = require('express');
const path = require('path');
const app = express();
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');


const public = path.resolve('./public');

app.use(methodOverride('_method'));

app.use(express.static(public));

app.set('views', path.join(__dirname, "views"))

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

app.use('/', userRoutes);

app.use('/', productRoutes);




app.listen(process.env.PORT || 3050, () => console.log('Servidor corriendo en el puerto 3050'));