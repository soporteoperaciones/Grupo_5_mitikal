const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session');


const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');

const { sessionSecret, cookiesSecret } = require('./config/config')
const app = express();


const cookiesSessionMiddleware = require('./middlewares/cookiesSessionMiddleware')
const sessionToLocals = require('./middlewares/sessionToLocals');
const { allowedNodeEnvironmentFlags } = require('process');
app.use(session({ secret: 'shhhh' }))
app.use(cookieParser('secreto'));
app.use(cookiesSessionMiddleware)
app.use(sessionToLocals)


const public = path.resolve('./public');

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'));

app.use(express.static(public));

app.set('views', path.join(__dirname, "views"))

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

app.use('/users', userRoutes);

app.use('/products', productRoutes);




app.listen(process.env.PORT || 3050, () => console.log('Servidor corriendo en el puerto 3050'));