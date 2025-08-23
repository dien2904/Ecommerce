const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbconnect = require('./config/dbconnect');
const initRouter = require('./routes');
const cookieparser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieparser());

// Middleware parse body JSON & form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối DB
dbconnect();

// Khai báo routes
initRouter(app);

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
