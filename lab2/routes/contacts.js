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
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contacts', {title: "Contacts", contactsList: data});
});

router.get('/:id', (req, res, next) => {
  res.send(`ID: ${req.params.id}`)
})

module.exports = router;
