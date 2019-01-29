const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Employee } = require('../models/employee') //import the user model

// Get all Employees ============================================
router.get('/', function (req, res) {
  Employee.find()
    .then(docs => res.json(docs))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    });
});

// Get single employee ============================================
// localhost:3000/employess/:<someId>
router.get('/:id', function (req, res) {
  Employee.findOne({ _id: req.params.id })
    .then(employee => res.json(employee.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    });
}); 

//Add Employee ============================================
router.post("/", (req, res) => {
  let employee = new Employee();
    employee.firstName   = req.body.firstName,
    employee.lastName    = req.body.lastName,
    employee.jobTitle    = req.body.jobTitle,
    employee.phoneNumber = req.body.phoneNumber,
    employee.street      = req.body.street,
    employee.city        = req.body.city,
    employee.state       = req.body.state,
    employee.zipCode     = req.body.zipCode

    employee.save((err) => {
      // Check for error
      if (err) {
          // If there is an error redirect user to the error page
          console.log("this is the employee: " + employee);
          // Send them to error page
          res.redirect('/error');
      } else {
          // If no error while saving the employee redirect the dash board
          console.log(employee);
          res.redirect('/dash.html');
      }
  });
});


//Edit Employee ============================================
router.put("/:id", (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message =
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }

  // we only support a subset of fields being updateable.
  // if the user sent over any of the updatableFields, we udpate those values
  // in document
  const toUpdate = {};
  const updateEmployee = ["firstName", "lastName", "jobTitle", "phonenNumber"];

  updateEmployee.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Employee
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(employee => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

//Delete Employee ============================================
router.delete("/:id", (req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(employee => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

module.exports = router;  