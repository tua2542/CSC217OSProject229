const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/', (req,res) => {
    res.render("employee/addOrEdit",{
        viewTitle : "Insert Employee"
    });
});


router.post('/', (req,res) => {
    InsertRecord(req,res);
});


function InsertRecord(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if(!err)
        res.redirect('employee/list');
        else {
            console.log('Error during record insertion : ' + err);
        }
    });

router.get('/list', (req,res) => {
    res.json('from list');
});


}
module.exports =  router;