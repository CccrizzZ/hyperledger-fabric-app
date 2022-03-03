'use strict';

const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;





class eKYC extends Contract {

    // constructor function
    async initLedger(ctx){
        console.info('initiallizing ledger...');

    }

    // utility
    async toBuffer(x) {
        return Buffer.from(JSON.stringify(x));
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

    
    async GetKYC(ctx, uname, orgname) {
        // get the state of id
        const query = await ctx.stub.getState(uname);

        // check if user's org name matches the param


        return query;
    }


    // remove kyc by id
    async RemoveKYC(ctx, uname, orgname) {

        // check if there is any kyc infos
        const assetJSON = await ctx.stub.getState(uname);
    
        return 1;
    }


}


module.exports = eKYC;