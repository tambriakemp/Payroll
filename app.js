const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees');
const dependentsRouter = require('./routes/dependents');



// Request to HTTP
app.use('/users', usersRouter); 
app.use('/employees', employeesRouter); 
app.use('/dependents', dependentsRouter); 


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



 
// Database setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const configDB = require('./config/database.js');
mongoose.connect(configDB.url, { useNewUrlParser: true });

const {user} = require('./models/user');
const {employee} = require('./models/employee');
const {dependent} = require('./models/dependent');



// Server
// const port = process.env.PORT || 3000;
// app.listen(port, (err) => {
//     if (err) {
//       console.log('Error: ', err);
//     } else {
//       console.log(`server listening on port:  ${port}`   );
//     }
//   })
  
module.exports = app;  