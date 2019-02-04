'use strict';

const mongoose = require('mongoose');

const EmployeeSchema =  mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: String,
    jobTitle: String,
    phoneNumber: Number,
    street: String, 
    city: String, 
    state: String, 
    zipCode: Number,
    dep: [{depFirstName:String,depLastName:String,relationship:String}]

    
});

EmployeeSchema.methods.serialize = function() {
      return {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      jobTitle: this.jobTitle,
      street: this.street,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      dep: this.dep
      
    };
};

const Employee = mongoose.model('Employee', EmployeeSchema, 'employees');

module.exports = { Employee }; 