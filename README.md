# hyperledger-eKYC-app "indevelopment"



### To start the blockchain
```
cd test-network
./network.sh up createChannel -ca -s couchdb

cd addOrg3
./addOrg3.sh up -c mychannel -ca -s couchdb
docker-compose -f docker/docker-compose-org3.yaml up -d
```

- couchdb admin gui is now running on "[YourIP]":5984/_utils

### Set environment variables
```
cd test-network

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
```

### Deploy chaincode
```
cd test-network

./network.sh deployCC -ccn eKYC -ccp ../chaincode/chaincode-javascript -ccl javascript -ccep "OR('Org1MSP.peer','Org2MSP.peer','Org3MSP.peer')" -c mychannel
```



### Project description 
- this is an eKYC app, designed for customer KYC for cryptocurrency exchanges.


### Requirements
- eKYC  using the verify solutions will allow the crypto exchange to be able to verify users’ identities while keeping in line with the government requirements of know your customers.


### State machine diagram
![diagram](https://github.com/CccrizzZ/hyperledger-fabric-app/blob/master/statemachine.png)


### Transition descriptions
- If document successfully submitted, transit from submission state to submission processing state.
- If document failed to pass fraud analysis, transit from submission processing state to submission state.
- If document passed fraud analysis, transit from processing to kyc success state.



### State data descriptions
- Document submission state
    - Login information
    - KYC information
    - Identification documents
- Document processing state
    - User documents
    - Processing result
- Success state
    - All user information
    - KYC confirmation


### Role descriptions
- Client: any user can create account which will be save in CouchDB, user KYC information will be stored on Hyperledger.
- Admin: verify data and approve or reject an application.

### Screenshots
![sc](https://github.com/CccrizzZ/hyperledger-fabric-app/blob/master/sc22.png)
![sc](https://github.com/CccrizzZ/hyperledger-fabric-app/blob/master/sc1.png)
![sc](https://github.com/CccrizzZ/hyperledger-fabric-app/blob/master/sc2.png)
