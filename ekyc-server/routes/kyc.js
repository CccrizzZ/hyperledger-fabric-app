var express = require('express');
var router = express.Router();
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');


// connect to hyperledger blockchain
// organization name, user id
connect = async (uname, orgName) => {


    // construct names
    let fullOrgName = orgName + '.example.com';
    let connName = 'connection-'+ orgName +'.json';


    // get organization path
    let ccpPath = path.resolve(__dirname, '..', '..', '..', 'fabric-samples','test-network', 'organizations', 'peerOrganizations', fullOrgName, connName);
        
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    console.log(ccp)
    
  

    // create fs wallet store it in express server
    let walletPath = '../wallets/' + fullOrgName;
    console.log(walletPath)

    let wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(wallet)

    // let userExists = await wallet.get(uname);
    // console.log(userExists)
  
  
    // // return false if cant find user
    // if (!userExists) {
    //   return false;
    // }

    // create gate way and connect
    let gateway = new Gateway();

    await gateway.connect(
      ccp, 
      {
        wallet, 
        identity: uname, 
        discovery: { 
            enabled: true, 
            asLocalhost: true 
        }
      }
    );
  
    // get the channel the operations are in
    let network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    let contract = network.getContract('assetTransfer');
  
    // return contract object
    return contract;
}


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' })
})


// get kyc info by name and org
router.get('/getkyc/:uname/:orgname', async (req, res, next) => {

    try {
        // get the contract
        let contract = await connect(
            req.params['uname'],
            req.params['orgname']
        );

        // return if contract not found
        if(!contract){
            res.send(false)

            // res.send("contract not found")
        }

        // const result = await contract.submitTransaction(
        //     'GetKYC',
        //     req.params['uname'], 
        // )
        
        res.send(true)



    } catch (err) {
        res.send("Err:" + err)
    }
})



  
  
module.exports = router;