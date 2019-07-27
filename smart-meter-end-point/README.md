# Distributed Infrastructure Underlying FaaS Cloud Federations

Node.js server acting as a facade for the distributed infrastructure underlying a FaaS Cloud Federation. Such infrastructure relies on blockchain system distributed among the federation peers and featuring smart contract. 

This respository contains the Node.js files implementing a REST *server acting as medium for the blockchain system*. Indeed, *different blockchain system implementations can be used*, the configuartion paramenters used by the APIs just need to be changed. 

The server has been currently configured for the blockchain system [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/latest/) v1.0.0. Its installation and deployment instruction can be found in the guide. Wheras, the smart contracts to deployed, which actually implement the functionality of the infrastructure, are instead available in the repository. 

For testing purpose, part of the infrastructure functionality are also implemented via [MongoDB](https://www.mongodb.com/en). Clearly, it only implements functionality related to management of data, not computational one. This option is chosen in the configuration file *config/default.yaml*.

Full documentation is reported in the official [SUNFISH Manual](http://sunfish-platform-docs.readthedocs.io/)

## Installation Guide

### Requirements 

Install the NodeJs environment, specifically: 
- *Node.js v6.x*
- *Npm v3.x*
Releases and installation guides can be found on the official web-sites [here](https://nodejs.org) and [here](https://www.npmjs.com/) 

In case the MongoDB back-end in used, install the following version:
- *MongoDB v3.x* 
Releases and installation guides can be found on the official web-site [here](https://www.mongodb.com/). 

To check that all the depencies have been set up, execute
```
  $ node -v
  -> v6.1.0
  $ npm -v
  -> 3.10.6
```
The name of the command *node* can change wrt the os, refer to the official guide. In case of using Mongo, execute
```
  $ mongo --version
  -> MongoDB shell version v3.4.6
```  

Finally, install the following Node dependencies:
- nodemon v1.14.12
- scp2 v0.5.0

To install them execute:
```
  $ npm install -g nodemon
  $ npm install -g scp2
```


### Server set-up
To set the service, execute the following commands
``` 
  $ git clone https://github.com/sunfish-prj/Service-Ledger.git
  $ cd Service-Ledger/server
```

To set up the ServiceLedger server, edit the file *config/default.yaml* properly. In this file it can be set to use MongoDB or Hyperledger Fabric 1.0.
In case the server is using MongoDB, you should also start it before ServiceLedger. See the corresponding command wrt your os [here](https://docs.mongodb.com/manual/administration/install-community/).
Similarly, if using Hyperledger Fabric 1.0, you need a running Fabric cluster to gather all information related to its docker containers.

Now you can start the ServiceLedger server:
```
  $ npm start
```


The server is now running and listening on the port chosen in the *config/default.yaml*. file (e.g. 8090). You can use the [client-stub interface](http://localhost:8090/docs).  


### Hyperledger API setup
To use ServiceLedger with Hyperledger Fabric, it is required to put into all Hyperledger machines the ServiceLedger API as explained in *Service-Ledger/server/hyperledger-fabric/api/README.md*


### Server test
To test the server API, there are available in the *test-client/* folder bash files with *curl* corresponding commands; url and port must be given as input, e.g. 
```
  $ ./kvStore.sh localhost 8090
```

Note that, this test requires MongoDB running, or if using Hyperledger Fabric, that the keyValueStore chaincode is deployed. Such a chaincode can be found in *Service-Ledger/server/hyperledger-fabric/chaincode/keyvaluestore*.

