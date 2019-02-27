// Load nodejs modules
const fs = require('fs');
const os = require('os');
// Load third party modules
const namespace = "org.blockit.electricity";
const state = "Request_Energy";
// Load built modules
const bnUtil             = require('./bn-connection-util');
const transactions       = require('./transactions');
const operations         = require('./operations');
const assets             = require('./assets');
// const seed               = require('./seed');
const util               = require('../../blockit-simulator/util');

bnUtil.connect(main);
function main(error){
    
// Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }

// Get the Business Network Definition
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("1. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());


// App started by loading a command on data by loading first value in array

    var reading = util.getSimulatorData();
    console.log(`executing ${util.getSimulatorData().length} operations`);
    reading.forEach((data) => {
        if (`${data.command}` === 'produce'){
            operations.produce(bnUtil, transactions, namespace, data.prosumerId, data.amount);
        }
        if (`${data.command}` === 'consume'){
            operations.consume(bnUtil, transactions, namespace, data.prosumerId, data.amount);
        }
        if (`${data.command}` === 'listing'){
            operations.listing(bnUtil, assets, namespace, data.listingId,data.electricityId,data.reservePrice,data.description,state);
        }        
        if (`${data.command}` === 'elec'){
            operations.elec(bnUtil, assets, namespace, data.electricityId, data.prosumerId, data.electricityamount)
        }
        if (`${data.command}` === 'offer'){
            operations.offer(bnUtil, transactions, namespace, data.prosumerId, data.amount)
        }
        if (`${data.command}` === 'close'){
            operations.close(bnUtil, transactions, namespace, data.listingId)
        }

    });
}
