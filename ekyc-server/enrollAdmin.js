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


        // construct names
        let orgname = `${orgname_in}.example.com`;
        let connectionname = `connection-${orgname_in}.json`;
        
        
        
        let ccpPath = path.resolve(__dirname, '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', orgname, connectionname);
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        
        
        
        // interacting with the ca
        let canname = `ca.${orgname_in}.example.com`;
        let caInfo = ccp.certificateAuthorities[canname];
        let caTLSCACerts = caInfo.tlsCACerts.pem;
        let ca = new FabricCAServices(
            caInfo.url, 
            { trustedRoots: caTLSCACerts, verify: false }, 
            caInfo.caName
        );

        

        // create filesystem wallets
        let walletsPath = `./wallets/${orgname}`
        let wallet = await Wallets.newFileSystemWallet(walletsPath);
        console.log(`wallets path: ${walletsPath}`);


        // query to see if user exists
        let query = await wallet.get(uname);
        if (query) {
            console.log(`Error! identity for the ${uname} exists!`);
            return;
        }

        
        // enroll user and export info to wallet
        let enrollment = await ca.enroll({ 
            enrollmentID: uname, 
            enrollmentSecret: upwd 
        });


        // public key cert
        let msp = orgname_in.replace('o','O')+'MSP';
        let x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: msp,
            type: 'X.509',
        };
        await wallet.put(uname, x509Identity);

        
        console.log(`Successfully enrolled ${uname}`);

    } catch (error) {
        console.error(`Failed to enroll: ${error}`);
        process.exit(1);
    }
}


main();
