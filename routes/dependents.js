const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Dependent } = require('../models/dependent') //connects to the user model


router.get('/', function (req, res) {
  Dependent.find()
    .then(docs => res.json(docs))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    });
});

// Get all dependents ============================================
router.get('/', function (req, res) {
  Dependent.find()
    .then(docs => res.json(docs))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    });
});

// Get single dependent ============================================
router.get('/:id', function (req, res) {
  Dependent.findById(req.params.id)
    .then(dependent => res.json(dependent.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
      });
}); 


//Add Dependents ============================================
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

  Dependent.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dependentType: req.body.dependentType,
  })
    .then(dependent => res.status(201).json(dependent.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});



//Delete Employee ============================================
router.delete("/:id", (req, res) => {
  Dependent.findByIdAndDelete(req.params.id)
    .then(dependent => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});






module.exports = router;  