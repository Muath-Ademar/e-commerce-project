const path = require('path'); // Add this at the top with other requires.
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

require('dotenv').config();
const port = process.env.PORT
require('./config/mongoose.config');
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
require('./routes/user.routes')(app)
require('./routes/product.routes')(app)
require('./routes/order.routes')(app)
require('./routes/cart.routes')(app)
require('./routes/contact.routes')(app)

app.listen(port, ()=> console.log(`Listening on port: ${port}`))