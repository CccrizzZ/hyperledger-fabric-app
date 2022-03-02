'use strict';

const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;





class eKYC extends Contract {

    // constructor function
    async initLedger(ctx){
        console.info('initiallizing ledger...');

    }

    // utility
    async toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }



    // a function called by outside world must return deterministic value
    async CreateKYC(ctx, uname, orgname) {


        // construct new info
        const info = {
            Name: uname,
            Org: orgname
        };

        // push kyc info into state
        ctx.stub.putState(uname, toBuffer(info));

        // return the new object
        return JSON.stringify(info);

    }

    
    async GetKYC(ctx, uname) {
        // get the state of id
        const assetJSON = await ctx.stub.getState(uname);


        return assetJSON;
    }


    // remove kyc by id
    async RemoveKYC(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        if (!assetJSON || assetJSON.length === 0) {
            return 0;
        }
        return 1;
    }


}


module.exports = eKYC;