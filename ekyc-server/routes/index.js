var express = require('express');
var router = express.Router();
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');


// connect to couch db
const nano = require('nano')('http://admin:adminpw@34.130.139.150:5984');
const usersDB = nano.db.use('kyc_users');





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// login with couch db
router.get('/login/:uname/:upwd', async (req, res, next) => {

  // construct new query
  const query = {
    selector: {
      name: { "$eq": req.params['uname']},
      pwd: {"$eq": req.params['upwd']}
    }
  };


  // look for the query described above
  let loginResults = await usersDB.find(query)
  res.send(loginResults.docs)

})


// register to couch db
router.post('/register/:uname/:upwd', async (req, res, next) => {

  // construct new user data
  const data = {
    name: req.params['uname'],
    pwd: req.params['upwd'],
    uploaded: "false",
    rejected: "false",
    kyc: "false",
    
  }

  // query object for existing name
  const query = {
    selector: {
      name: { "$eq":  data.name }
    }
  };

  // look for the query for repeating names
  let queryResult = await usersDB.find(query)


  // if name existed in db, reject
  if (queryResult.docs.length >= 1) {

    res.send('name exist')
    return

  }else{

    // if not exist return register result
    let registerResults = await usersDB.insert(data)
    res.send(registerResults)
    return






  }
  

})




// get kyc info by id
router.get('/getkyc/:uid', async (req, res, next) => {

  // construct new query
  const query = {
    selector: {
      _id: { "$eq": req.params['uid']},
    }
  }

  // look for the query described above
  let queryResults = await usersDB.find(query)
  if (queryResults.docs.length == 0) {
    res.send("user dont exist")
  }else{
    res.send(queryResults.docs[0]['kyc'])
  }

})




// approve user by id
router.post('/approve/:uid', async (req, res, next) => {


  // construct new query
  const query = {
    selector: {
      _id: { "$eq": req.params['uid']},
    }
  }


  // look for the query described above
  let queryResults = await usersDB.find(query)
  
  // construct update data
  const data = {
    _id: queryResults.docs[0]['_id'],
    _rev: queryResults.docs[0]['_rev'],
    name: queryResults.docs[0]['name'],
    pwd: queryResults.docs[0]['pwd'],
    uploaded: queryResults.docs[0]['uploaded'],
    rejected: queryResults.docs[0]['rejected'],
    kyc: "true"
  }

  // update this date to the data base by adding _rev
  let approveResults = await usersDB.insert(data)

  res.send(approveResults)

})




// reject user by id
router.post('/reject/:uid', async (req, res, next) => {


  // construct new query
  const query = {
    selector: {
      _id: { "$eq": req.params['uid']},
    }
  }


  // look for the query described above
  let queryResults = await usersDB.find(query)
  
  // construct update data
  const data = {
    _id: queryResults.docs[0]['_id'],
    _rev: queryResults.docs[0]['_rev'],
    name: queryResults.docs[0]['name'],
    pwd: queryResults.docs[0]['pwd'],
    uploaded: queryResults.docs[0]['uploaded'],
    rejected: "true",
    kyc: queryResults.docs[0]['kyc']
  }

  // update this date to the data base by adding _rev
  let approveResults = await usersDB.insert(data)

  res.send(approveResults)

})


// remove user kyc by id
router.post('/remove/:uid', async (req, res, next) => {


  // construct new query
  const query = {
    selector: {
      _id: { "$eq": req.params['uid']},
    }
  }


  // look for the query described above
  let queryResults = await usersDB.find(query)
  
  // construct update data
  const data = {
    _id: queryResults.docs[0]['_id'],
    _rev: queryResults.docs[0]['_rev'],
    name: queryResults.docs[0]['name'],
    pwd: queryResults.docs[0]['pwd'],
    uploaded: "false",
    rejected: "false",
    kyc: "false"
  }

  // update this date to the data base by adding _rev
  let approveResults = await usersDB.insert(data)

  res.send(approveResults)

})

// get all users
router.get('/giveallusers', async (req, res, next) => {

  // get all rows including their docs
  let doclist = await usersDB.list({include_docs: true})

  // send to client
  res.send(doclist.rows)

})



module.exports = router;
