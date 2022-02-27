'use strict';

const { Contract } = require('fabric-contract-api');






class eKYC extends Contract {

    // constructor function
    async initLedger(ctx){

        console.info('initiallizing ledger...');
        const assets = [
            {
                ID: '1',
                Name: 'First-Last',
                DOB: '20200101',
                KYC: 'false'
            },
        ];

        for (const asset of assets) {
            asset.docType = 'kyc';
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`${asset.ID} KYC success`);
        }


    }


    // a function called by outside world must return deterministic value
    async CreateKYC(ctx, id, name, DOB) {

        // construct new info
        const info = {
            ID: id,
            Name: name,
            DOB: DOB
        };

        // push kyc info into state
        // id <====> kycInfo
        ctx.stub.putState(id, Buffer.from(JSON.stringify(info)));

        // return the new object
        return JSON.stringify(info);

    }


    // lookup kyc info
    async ReadKYC(ctx, id) {
        // get the state of id
        const assetJSON = await ctx.stub.getState(id);

        // if found return true
        // if not found return false
        return assetJSON && assetJSON.length > 0;
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