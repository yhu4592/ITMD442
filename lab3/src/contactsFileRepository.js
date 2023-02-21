const fs = require('fs')
const path = require('path')
const Contact = require('./contact')
const betterSqlite3 = require('better-sqlite3')

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log })

const createSmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (contactID INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, notes TEXT, date TEXT)")
createSmt.run()

const repo = {
  findAll: () => {
    const stmt = db.prepare("SELECT * FROM contacts")
    const contacts = []
    stmt.all().forEach(contactData => {
      const contactObject = new Contact(contactData.contactID, contactData.firstName, contactData.lastName, contactData.email, contactData.notes, contactData.date)
      contacts.push(contactObject)
    })
    return contacts
  },
  findById: (id) => {
    const stmt = db.prepare("SELECT * FROM contacts WHERE contactID = ?")
    const contact = stmt.get(id)
    return new Contact(contact.contactID, contact.firstName, contact.lastName, contact.email, contact.notes, contact.date)
  },
  create: newContact => {
    const stmt = db.prepare("INSERT INTO contacts (firstName, lastName, email, notes, date) VALUES (?, ?, ?, ?, ?)")
    const info = stmt.run(newContact.firstName, newContact.lastName, newContact.email, newContact.notes, newContact.date)
  },
  deleteById: id => {
   const stmt = db.prepare("DELETE FROM contacts WHERE contactID = ?")
   const info = stmt.run(id)
  },
  update: contact => {
    const stmt = db.prepare("UPDATE contacts SET firstName = ?, lastName = ?, email = ?, notes = ?, date = ? where contactID = ?")
    const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes, contact.date, contact.contactID)
  }
}

module.exports = repo