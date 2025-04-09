const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

require('dotenv').config();
const port = process.env.PORT
require('./config/mongoose.config');
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
require('./routes/user.routes')(app)
require('./routes/product.routes')(app)
require('./routes/order.routes')(app)
require('./routes/cart.routes')(app)

app.listen(port, ()=> console.log(`Listening on port: ${port}`))