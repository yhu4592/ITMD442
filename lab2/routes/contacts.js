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

/* GET contactID listing */
router.get('/:id', (req, res, next) => {
  let id = data.find(contact => contact.contactID == req.params.id)
  res.render('contactsID', {title: id.firstName, info:id})
})



module.exports = router;
