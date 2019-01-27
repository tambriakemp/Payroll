const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(express.json());
app.use(bodyParser.json());

// app.get('/', function(req, res) {
//     res.send('hello');
// })


// Routes
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees');
const dependentsRouter = require('./routes/dependents');



// Request to HTTP
app.use('/users', usersRouter); 
app.use('/employees', employeesRouter); 
app.use('/dependents', dependentsRouter); 

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    next();
});


 
// Database setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const configDB = require('./config/database.js');
mongoose.connect(configDB.url, { useNewUrlParser: true });

const {user} = require('./models/user');
const {employee} = require('./models/employee');
const {dependent} = require('./models/dependent');



// Server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log(`server listening on port:  ${port}`   );
    }
  })
  
module.exports = app;  