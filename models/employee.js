'use strict';

const mongoose = require('mongoose');

const schema =  mongoose.Schema({
    // _id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String,
    title: String,
    phoneNumber: Number,
    address: {street: String, 
        address2: String, 
        city: String, 
        state: String, 
        zipCode: Number},
    numberOfDependents: Number,
    dependents: [{type: mongoose.Schema.Types.ObjectId, ref: 'dependents'}] ,
    salary: Number 
    
});



const Employee = mongoose.model('Employee', schema, 'employees');

module.exports = { Employee }; 