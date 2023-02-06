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
    date: Date()
  }
  if (newContact.firstName === '' || newContact.lastName === ''){
    res.render('contactForm', {title: "Contacts Form", msg: "Name fields cannot be empty!"})
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

router.post('/:id/edit', (req, res, next) => {
  const updateContact = {
    contactID: req.params.id,
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    notes: req.body.notes.trim(),
    date: Date()
  }
  contactsRepo.update(updateContact)
  res.redirect(`/contacts/${req.params.id}`)
})

module.exports = router;
