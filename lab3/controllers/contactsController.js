const contactsRepo = require('../src/contactsFileRepository')
const Contact = require('../src/contact')

exports.contacts_list = (req, res, next) => {
    const data = contactsRepo.findAll()
    res.render('contacts', {title: "Contacts", contactsList: data})
}

exports.contacts_create_form = (req, res, next) => {
    res.render('contactForm', {title: "Contact Form"})
}

exports.contacts_create_form_post = (req, res, next) => {
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
}

exports.contacts_get_listing = (req, res, next) => {
    const id = contactsRepo.findById(req.params.id)
    if (id) {
      res.render('contactsID', {title: id.firstName + ' ' + id.lastName, info:id})
    } else {
      res.redirect('/contacts')
    }
}

exports.contacts_get_delete = (req, res, next) => {
    res.render('contactFormDelete', {title: "Delete Contact", info: contactsRepo.findById(req.params.id)})
}

exports.contacts_delete_post = (req, res, next) => {
    contactsRepo.deleteById(req.params.id)
    res.redirect('/contacts')
}

exports.contacts_get_edit = (req, res, next) => {
    res.render('contactFormEdit', {title: 'Edit Contact', info: contactsRepo.findById(req.params.id)})
}

exports.contacts_edit_post = (req, res, next) => {
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
}