const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const Contact = require('./contact')
const betterSqlite3 = require('better-sqlite3')

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log })

const createSmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (contactID TEXT PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT, notes TEXT, date TEXT)")
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
    
  },
  deleteById: id => {
   
  },
  update: contact => {
    
  }
}

module.exports = repo