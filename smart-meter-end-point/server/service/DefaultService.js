'use strict';


/**
 * Store a consumption of energy
 *
 * consumeEnergy Consumer-request-body 
 * returns ack-response
 **/
exports.consumePOST = function(consumeEnergy) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : 200
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieving consumption given an Id\\n
 *
 * consumeEnergy Get-request-body 
 * returns energy-response
 **/
exports.getPOST = function(consumeEnergy) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "energy" : "energy"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

