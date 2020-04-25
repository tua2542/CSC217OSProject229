require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
const employeeController = require('./controllers/employeeController');
const path = require('path');
const exphbs = require('express-handlebars');



var app = express();

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/employee', employeeController);





app.listen(3000, () => console.log('Server running...'));





