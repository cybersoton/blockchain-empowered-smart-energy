// Load nodejs modules
var fs = require('fs')
// Load BlockIT Constants
const util               = require('./util');

function main(error){
    var reading = util.getSimulatorData();
    var logger = fs.createWriteStream('simulator.sh', {
    flags: 'a' // 'a' means appending (old data will be preserved)
    })


    logger.write('#!/bin/bash'+ "\n")
    console.log(`executing ${reading.length} operations`);
    reading.forEach((data) => {
        if (`${data.command}` === 'prosumer'){
            operations= "node blockit-app.js "+data.command+" -p "+data.prosumerId+" -n "+data.name+" --bl "+data.balance+" -e "+data.electricityId;
        }
        if (`${data.command}` === 'electricity'){
            operations= "node blockit-app.js "+data.command+" -p "+data.prosumerId+" -a "+data.amount+" -e "+data.electricityId;
        }
        if (`${data.command}` === 'trade'){
            operations= "node blockit-app.js "+data.command+" -pa "+data.prosumerIdA+" -pb "+data.prosumerIdb+" -a "+data.amount;
        }
        if (`${data.command}` === 'produce'){
            operations= "node blockit-app.js "+data.command+" -p "+data.prosumerId+" -a "+data.amount;
        }
        if (`${data.command}` === 'consume'){
            operations= "node blockit-app.js "+data.command+" -p "+data.prosumerId+" -a "+data.amount;
        }
        if (`${data.command}` === 'listing'){
            operations= "node blockit-app.js "+data.command+" -l "+data.listingId+" -e "+data.electricityId+" -r "+data.reservePrice+" -d "+data.description;
        }        
        if (`${data.command}` === 'elec'){
            operations= "node blockit-app.js "+data.command+" -e "+data.electricityId+" -p "+data.prosumerId+" -a "+data.electricityamount;
        }
        if (`${data.command}` === 'offer'){
            operations= "node blockit-app.js "+data.command+" -p "+data.prosumerId+" -l "+data.listingId+" -b "+data.maxBid;
        }
        if (`${data.command}` === 'close'){
            operations= "node blockit-app.js "+data.command+" -l "+data.listingId;
        }
    console.log(operations);
    logger.write(operations+ "\n")
    });
 logger.end()   
}

main();
