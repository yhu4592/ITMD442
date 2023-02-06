var express = require('express')
var router = express.Router()
const contactsRepo = require('../src/contactsFileRepository')

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll()
  res.render('contacts', {title: "Contacts", contactsList: data});
})

/* GET create contact form */
router.get('/add', (req, res, next) => {
  res.render('contactForm', {title: "Contact Form"})
})

/* POST create contact form */
router.post('/add', (req, res, next) => {
  const newContact = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    notes: req.body.notes.trim(),
  }
  if (newContact.firstName === '' || newContact.lastName === '' || newContact.notes === ''){
    res.render('contactForm', {title: "Contacts Form", msg: "Form fields cannot be empty!"})
  } else {
    contactsRepo.create(newContact)
    res.redirect('/contacts')
  }
})

/* GET contactID listing */
router.get('/:id', (req, res, next) => {
  const id = contactsRepo.findById(req.params.id)
  if (id) {
    res.render('contactsID', {title: id.firstName + id.lastName, info:id})
  } else {
    res.redirect('/contacts')
  }
  
})

module.exports = router;
