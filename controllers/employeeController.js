const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
  });
});

router.post("/", (req, res) => {
  const output = `
    <p> You have a new member </p>
    <h3>Member Detail</h3>
    <ul>
      <li>Full name: ${req.body.fullName}</li>
      <li>Email:    ${req.body.email}</li>
      <li>Mobile:   ${req.body.mobile}</li>
      <li>City:     ${req.body.city}</li>
    </ul>

  `;
  //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "a643d5c339047c", // generated ethereal user
      pass: "224bcbe8784162", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <sakdipat.2542@mail.kmutt.ac.th>', // sender address
    to: "sakdipat3536@gmail.com", // list of receivers
    subject: "Node Memeber", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });

  if (req.body._id == "") InsertRecord(req, res);
  else updateRecord(req, res);
});

function InsertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) res.redirect("employee/list");
    else {
      if (err.name == "validationError") {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Insert Employee",
          employee: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (err.name == "validationError") {
          handleValidationError(err, req.body);
          res.render("employee/addOrEdit", {
            viewTitle: "Update Employee",
            employee: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs,
      });
    } else {
      console.log("Error during retrieving employee list : " + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch ((err, errors[field].path)) {
      case "fullname":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("employee/addOrEdit", {
        viewTitle: "Update Employee",
        employee: doc,
      });
    }
  });
});
router.get("/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/employee/list");
    } else {
      console.log("Error in  employee delete : " + err);
    }
  });
});

module.exports = router;
