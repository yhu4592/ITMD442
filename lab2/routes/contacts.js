var express = require('express');
var router = express.Router();

let data = [
  {
    contactID: 2,
    firstName: "John",
    lastName: "Smith",
    emailAddress: "random@email.com",
    notes: "test",
    date: Date()
   },
  {
    contactID: 3,
    firstName: "Jane",
    lastName: "Smith",
    emailAddress: "random@email.com",
    notes: "best",
    date: Date()
  }
]
/* GET contacts listing. */
router.get('/', function(req, res, next) {
  res.render('contacts', {title: "Contacts", contactsList: data});
});

/* GET create contact form */
router.get('/add', (req, res, next) => {
  res.render('contactForm', {title: "Contact Form"})
})

/* POST create contact form */
router.post('/add', (req, res, next) => {
  let newContact = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    notes: req.body.notes.trim(),
  }
  if (newContact.firstName === '' || newContact.lastName === '' || newContact.notes === ''){
    res.render('contactForm', {title: "Contacts Form", msg: "Form fields cannot be empty!"})
  } else {
    res.send("hi")
  }
  //res.render('contactForm', {title: "Contact Form"})
})

/* GET contactID listing */
router.get('/:id', (req, res, next) => {
  let id = data.find(contact => contact.contactID == req.params.id)
  res.render('contactsID', {title: id.firstName, info:id})
})



module.exports = router;
