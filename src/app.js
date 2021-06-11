const express = require('express');
const path = require('path');
const app = express();
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


const public = path.resolve('./public');

app.use(express.static(public));

app.set('views', path.join(__dirname, "views"))

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

app.use(methodOverride('_method'));


app.get('/login', userRoutes);
app.get('/reset_account', userRoutes);
app.get('/register', userRoutes);
app.get('/cart', userRoutes);



app.get('/market', productRoutes);
app.get('/market_test', productRoutes);
app.get('/novedades', productRoutes);
app.get('/destacados', productRoutes);
app.get('/detalleProducto', productRoutes);
app.get('/createProduct', productRoutes);
app.get('/updateProduct', productRoutes);


app.listen(process.env.PORT || 3050, () => console.log('Servidor corriendo en el puerto 3050'));