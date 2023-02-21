const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const betterSqlite3 = require('better-sqlite3')

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log })

const createSmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (contactID TEXT PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT, notes TEXT, date TEXT")
createSmt.run()

const repo = {
  findAll: ,
  findById: ,
  create: newContact => {
    
  },
  deleteById: id => {
   
  },
  update: contact => {
    
  }
}

loadData()

module.exports = repo