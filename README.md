# hyperledger-eKYC-app


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
![diagram](https://github.com/CccrizzZ/hyperledger-fabric-app/blob/master/sc22.png)