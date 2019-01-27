const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Employee } = require('../models/employee') //connects to the user model


// Get all Employees
router.get('/', function(req, res) {
    Employee.find()
      .then(docs => res.json(docs))
      .catch(err => {
            console.error(err); 
            res.status(500).json({message: 'Internal Server Error'})
          });
});

//Get single employee
// router.get(':id', function(req, res) {
  
//   Employee.findById(req.params.id)
//     .then(Employee => res.json(employee.serialize()))
//     .catch(err => {
//           console.error(err); 
//           res.status(500).json({message: 'Internal Server Error'})
//         });

// });


//Add Employee 


//Delete Employee 

//Edit Employee Button Updates Existing Employee



// app.get("/restaurants/:id", (req, res) => {
//   Restaurant
//     // this is a convenience method Mongoose provides for searching
//     // by the object _id property
//     .findById(req.params.id)
//     .then(restaurant => res.json(restaurant.serialize()))
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: "Internal server error" });
//     });
// });


module.exports = router;  