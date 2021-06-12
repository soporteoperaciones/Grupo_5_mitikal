const express = require('express');
const path = require('path');
const app = express();
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override')


const public = path.resolve('./public');

app.use(express.static(public));

app.set('views', path.join(__dirname, "views"))

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

app.use('/', userRoutes);
/*
app.use('/login', userRoutes);
app.use('/reset_account', userRoutes);
app.use('/register', userRoutes);
app.use('/cart', userRoutes);
*/

app.use('/products', productRoutes);
/*
app.use('/market', productRoutes);
app.use('/market_test', productRoutes);
app.use('/novedades', productRoutes);
app.use('/destacados', productRoutes);
app.use('/detalleProducto', productRoutes);
app.use('/createProduct', productRoutes);
app.use('/updateProduct', productRoutes);
*/

app.listen(process.env.PORT || 3050, () => console.log('Servidor corriendo en el puerto 3050'));