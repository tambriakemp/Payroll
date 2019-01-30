const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
const indexRouter = require('./routes/index');
const employeesRouter = require('./routes/employees');


// Request to HTTP
app.use('/', indexRouter);
app.use('/employees', employeesRouter); 
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const configDB = require('./config/database.js');
mongoose.set('debug', true);
mongoose.connect(configDB.url, { useNewUrlParser: true });

const {employee} = require('./models/employee');


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