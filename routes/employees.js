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

//Get all Employees Page

//Add Employee 

//Delete Employee 

//Edit Employee Button Updates Existing Employee






module.exports = router;  