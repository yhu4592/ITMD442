var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
                        title: 'Contacts List', 
                        intro: 'This application allows you to keep track of the contact information for different people. The application is served on a Node/Express application and contact information is stored on the file system with JSON. Users can also edit and delete contacts if they so desire.',
                        myInfo: {
                                  name: 'Yongkang Hu',
                                  email: 'yhu78@hawk.iit.edu'
                                } 
                      });
});

module.exports = router;
