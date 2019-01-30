const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const { Employee } = require('../models/employee') //import the user model

// Get all Employees ============================================
router.get('/', function (req, res) {
  console.log('employee get');
  Employee.find()
    .then(docs => res.json(docs))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    });
});

// Get single employee ============================================
router.get('/:id', function (req, res) {
  console.log('employee  by id');
  Employee.findOne({ _id: req.params.id })
    .then(employee => res.json(employee.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    });
});

//Add Employee ============================================
router.post("/", (req, res) => {
  console.log('employee post');
  let employee = new Employee();
    employee.firstName   = req.body.firstName,
    employee.lastName    = req.body.lastName,
    employee.jobTitle    = req.body.jobTitle,
    employee.phoneNumber = req.body.phoneNumber,
    employee.street      = req.body.street,
    employee.city        = req.body.city,
    employee.state       = req.body.state,
    employee.zipCode     = req.body.zipCode,
    employee.dep         = req.body.dep
    
 
  employee.save((err) => {
    if (err) {
      res.redirect('/error');
    } else {
      console.log(employee);
      res.redirect('/');
    }
  });
});


//Edit Employee ============================================
router.put("/:id", (req, res) => {
  // console.log('employee put');
  // if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  //   const message =
  //     `Request path id (${req.params.id}) and request body id ` +
  //     `(${req.body.id}) must match`;
  //   console.error(message);
  //   return res.status(400).json({ message: message });
  // }

  const toUpdate = {};
  const updateEmployee = ["firstName", "lastName", "jobTitle", "phonenNumber", "depFirstName", "dep.depLastName", "dep.relationship" ];

  updateEmployee.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Employee
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