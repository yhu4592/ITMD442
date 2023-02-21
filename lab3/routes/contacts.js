var express = require('express')
var router = express.Router()
const contactsRepo = require('../src/contactsFileRepository')
const Contact = require('../src/contact')
const contactsController = require('../controllers/contactsController')

/* GET contacts listing. */
router.get('/', contactsController.contacts_list)

/* GET create contact form */
router.get('/add', contactsController.contacts_create_form)

/* POST create contact */
router.post('/add', contactsController.contacts_create_form_post)

/* GET contactID listing */
router.get('/:id', contactsController.contacts_get_listing)

/* GET delete form */
router.get('/:id/delete', contactsController.contacts_get_delete)

/* POST delete contact */
router.post('/:id/delete', contactsController.contacts_delete_post)

/* GET edit form */
router.get('/:id/edit', contactsController.contacts_get_edit)

/* POST edit contact */
router.post('/:id/edit', contactsController.contacts_edit_post)

module.exports = router;
