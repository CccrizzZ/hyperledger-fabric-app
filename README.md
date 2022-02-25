# hyperledger-eKYC-app


### Project description 
- this is an eKYC app, designed for customer KYC for cryptocurrency exchanges.


### Requirements
- eKYC  using the verify solutions will allow the crypto exchange to be able to verify users’ identities while keeping in line with the government requirements of know your customers.


### State machine diagram



### Transition descriptions

### State data descriptions
- State: Register; Not registered, Approved or Rejected
- Name: First Name; Middle Name; Last Name
- Date of Birth; Most be over 16 years of age
- Address: Within the Jurisdiction where ID is issued
- Identification Permitted: Citizenship Passport, Drivers License, Permanent resident card

### Role descriptions
- Users – Any user can create account which will be save in CouchDB
- Org 1 Admin – Users from Org 1 who verify data and approve or reject an application
- Org 2 Amin – User  from Org 2 who can verify data and approve or reject an application

### Screenshots