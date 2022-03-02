/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');


async function main() {
  try {

    // cli argument
    let orgname_in = process.argv[2];
    let uname = process.argv[3];
    let upwd = process.argv[4];
    let userrole = process.argv[5];

    // construct names
    let orgname = `${orgname_in}.example.com`;
    let connectionname = `connection-${orgname_in}.json`;


    // load the network configuration
    let ccpPath = path.resolve(__dirname, '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', orgname, connectionname);
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));


    // create new ca client 
    let canname = `ca.${orgname_in}.example.com`;
    let caURL = ccp.certificateAuthorities[canname].url;
    let ca = new FabricCAServices(caURL);


    
    // create fs wallets
    let walletPath = path.join(process.cwd(), 'wallets', orgname);
    let wallet = await Wallets.newFileSystemWallet(walletPath);
    
    // get admin identity
    const adminIdentity = await wallet.get('admin');
    if (!adminIdentity) {
      console.log('Admin dont exists, please enroll admin first');
      return;
    }


    // return if user name exists
    let userIdentity = await wallet.get(uname);
    if (userIdentity) {
      res.json({
        status: false, 
        error: { message: 'Error! User exists' }
      });

      return;
    }


    // construct user obj for ca interaction
    let provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    let adminUser = await provider.getUserContext(adminIdentity, 'admin');


    // register and enroll the user with the user object
    let secret = await ca.register({
      enrollmentID: uname,
      role: 'client',
      attrs: [
        {
          name: "role",
          value: userrole,
          ecert: true
        },
        {
          name: "upwd",
          value: upwd,
          ecert: true
        }
      ]
    }, adminUser);


    let enrollment = await ca.enroll({
      enrollmentID: uname,
      enrollmentSecret: secret
    });


    // create identity
    let msp = orgname_in.replace('o', 'O') + 'MSP';
    let x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: msp,
      type: 'X.509',
    };


    await wallet.put(uname, x509Identity);
    console.log('registration user success!');

  } catch (error) {
    console.error(`failed to register: ${error}`);
    return
  }
}

main();
