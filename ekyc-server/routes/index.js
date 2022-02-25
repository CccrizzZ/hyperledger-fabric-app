var express = require('express');
var router = express.Router();


// connect to couch db
const nano = require('nano')('http://admin:adminpw@34.130.139.150:5984');
const usersDB = nano.db.use('kyc_users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get username and password, send them to couch db
router.get('/login/', async (req, res, next) => {


  // const doc = await usersDB.get("uname")
  res.send(doc)
})


module.exports = router;
