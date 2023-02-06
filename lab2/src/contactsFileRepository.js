const db = new Map();
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const loadData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'))
  const contactsArray = JSON.parse(jsonData)
  contactsArray.forEach(contact => {
    db.set(contact[0], contact[1])
  })
}
const saveData = () => {
  const stringifyData = JSON.stringify(Array.from(db))
  fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData)
}

const repo = {
  findAll: () => Array.from(db.values()),
  findById: id => db.get(id),
  create: newContact => {
    const contact = {
      contactID: crypto.randomUUID(),
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      email: newContact.email,
      notes: newContact.notes,
      date: Date()
    }
    db.set(contact.contactID, contact)
    saveData()
  },
  deleteById: id => {
    db.delete(id)
    saveData()
  },
  update: contact => {
    db.set(contact.contactID, contact)
    saveData()
  }
}

loadData()

module.exports = repo