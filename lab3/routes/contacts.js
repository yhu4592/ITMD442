var express = require('express')
var router = express.Router()
const contactsRepo = require('../src/contactsFileRepository')
const Contact = require('../src/contact')

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll()
  res.render('contacts', {title: "Contacts", contactsList: data});
})

/* GET create contact form */
router.get('/add', (req, res, next) => {
  res.render('contactForm', {title: "Contact Form"})
})

/* POST create contact */
router.post('/add', (req, res, next) => {
  const newContactData = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    notes: req.body.notes.trim(),
    date: Date().toString()
  }
  if (newContactData.firstName === '' || newContactData.lastName === ''){
    res.render('contactForm', {title: "Contacts Form", msg: "Name fields cannot be empty!"})
  } else {
    const newContact = new Contact('', newContactData.firstName, newContactData.lastName, newContactData.email, newContactData.notes, newContactData.date)
    contactsRepo.create(newContact)
    res.redirect('/contacts')
  }
})

/* GET contactID listing */
router.get('/:id', (req, res, next) => {
  const id = contactsRepo.findById(req.params.id)
  if (id) {
    res.render('contactsID', {title: id.firstName + ' ' + id.lastName, info:id})
  } else {
    res.redirect('/contacts')
  }
})

/* GET delete form */
router.get('/:id/delete', (req, res, next) => {
  res.render('contactFormDelete', {title: "Delete Contact", info: contactsRepo.findById(req.params.id)})
})

/* POST delete contact */
router.post('/:id/delete', (req, res, next) => {
  contactsRepo.deleteById(req.params.id)
  res.redirect('/contacts')
})

/* GET edit form */
router.get('/:id/edit', (req, res, next) => {
  res.render('contactFormEdit', {title: 'Edit Contact', info: contactsRepo.findById(req.params.id)})
})

/* POST edit contact */
router.post('/:id/edit', (req, res, next) => {
  const updateContactData = {
    contactID: req.params.id,
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    notes: req.body.notes.trim(),
    date: Date().toString()
  }
  if (updateContactData.firstName === '' || updateContactData.lastName === ''){
    res.render('contactFormEdit', {title: "Contacts Form", info: contactsRepo.findById(req.params.id), msg: "Name fields cannot be empty!"})
  } else {
    const updatedContact = new Contact(updateContactData.contactID, updateContactData.firstName, updateContactData.lastName, updateContactData.email, updateContactData.notes, updateContactData.date)
    contactsRepo.update(updatedContact)
    res.redirect(`/contacts/${req.params.id}`)
  }
})

module.exports = router;
