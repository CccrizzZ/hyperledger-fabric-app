var express = require('express');
var router = express.Router();
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');


// connect to hyperledger blockchain
// organization name, user id
async function connect(uname, orgName) {


    // construct names
    let fullOrgName = orgName + '.example.com';
    let connName = 'connection-'+ orgName +'.json';


    // get organization path
    let ccpPath = path.resolve(__dirname, '..', '..', '..', 'fab2', 'fabric-samples','test-network', 'organizations', 'peerOrganizations', fullOrgName, connName);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    console.log(ccpPath)
    console.log(ccp.client)
    
  

    // create fs wallet store it in express server
    let walletPath = path.join(process.cwd(), 'wallets', fullOrgName);
    console.log(walletPath)

    let wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(await wallet.list()) // show all the wallets in that organization

    let userExists = await wallet.get(uname);
    console.log(userExists) // credentials
  


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
    let network = await gateway.getNetwork('kycchannel');

    // Get the contract from the network.
    let contract = network.getContract('eKYC');

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

        }

        const result = await contract.submitTransaction(
            'GetKYC',
            req.params['uname'], 
            req.params['orgname']
        )
        
        res.send(result)



    } catch (err) {
        res.send("Err: " + err)
    }
})



  
  
module.exports = router;