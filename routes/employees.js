const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const { mongoose, ObjectID }  = require('mongoose');


const { Employee } = require('../models/employee') //import the user model

// Get all Employees ============================================
router.get('/', function(req, res) {
    Employee.find()
      .then(docs => res.json(docs))
      .catch(err => {
            console.error(err); 
            res.status(500).json({message: 'Internal Server Error'})
          });
});

// Get single employee ============================================
// localhost:3000/employess/:<someId>
router.get('/:id', function(req, res) {

  Employee.findOne({ _id: req.params.id})

  // Employee.findById(req.params.id)
    .then(employee => res.json(employee.serialize()))
    .catch(err => {
          console.error(err); 
          res.status(500).json({message: 'Internal Server Error'})
        });
});


//Add Employee ============================================
router.post("/", (req, res) => {
  // const requiredFields = ["firstName", "lastName", "jobTitle","phoneNumber"];
  // for (let i = 0; i < requiredFields.length; i++) {
  //   const field = requiredFields[i];
  //   if (!(field in req.body)) {
  //     const message = `Missing \`${field}\` in request body`;
  //     console.error(message);
  //     return res.status(400).send(message);
  //   }
  // }
  // let urlString = 'employees/' + _id; 
  Employee.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    phoneNumber: req.body.phoneNumber,
    address: { street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode
    }
    // urlString: req.body.urlString

  })
    .then(employee => res.status(201).json(employee.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});


//Edit Employee ============================================
router.put("/:id", (req, res) => {
  // ensure that the id in the request path and the one in request body match
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