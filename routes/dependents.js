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




  let dependent = new Dependent();
    dependent.firstName   = req.body.depFirstName,
    dependent.lastName    = req.body.depLastName,
    dependent.relationship    = req.body.relationship


     dependent.save((err) => {
      // Check for error
      if (err) {
          // If there is an error redirect user to the error page
          console.log("this is the dependent: " + dependent);
          // Send them to error page
          res.redirect('/error');
      } else {
      User.findOne({_id:req.body.employee})
        .then((user)=>{
            user.dependents.push(dependent._id);
            return user.save();
         })
        //  .then(() =>res.redirect('/dash.html'))};


          //find id of request employee

      //     Employee.findOne({_id:req.body.employee})
      //     .then((dependent)=>{
      //         employee.dependents.push(dependent._id);
      //         return dependent.save();
      //      })
      //     //  .then(() =>res.redirect('/dash.html'))};
      //       //find id of request employee
      //       console.log(dependent);
            // res.redirect('/dash.html');
      }
   });
    
});


//Delete Employee ============================================
router.delete("/:id", (req, res) => {
  Dependent.findByIdAndDelete(req.params.id)
    .then(dependent => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});






module.exports = router;  