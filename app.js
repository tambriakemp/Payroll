const express = require('express');
const app = express();


app.use(express.json());

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