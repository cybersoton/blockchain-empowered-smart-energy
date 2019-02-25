// Load nodejs modules
const fs = require('fs');
const os = require('os');
// Utitlity Functions for Reading/Writing from Json Files 
//----------------------------------------------------//
var saveReading = (reading) =>
  {
  fs.writeFileSync('data.json', JSON.stringify(reading));
  };
//----------------------------------------------------//
var saveToSh = (reading) =>
  {
  fs.writeFileSync('simulator.sh', reading);
  };
//----------------------------------------------------//
 var logInstance = (data)=> {
  console.log('---');
  console.log(`command:       ${data.command}`);
  console.log(`name:          ${data.name}`);
  console.log(`prosumerId:    ${data.prosumerId}`);
  console.log(`prosumerIdA:   ${data.prosumerIdA}`);
  console.log(`prosumerIdB:   ${data.prosumerIdB}`);
  console.log(`electricityId: ${data.electricityId}`);
  console.log(`listingId:     ${data.listingId}`);
  console.log(`amount:        ${data.amount}`);
  console.log(`balance:       ${data.balance}`);
  console.log(`bid:           ${data.bid}`);
  console.log(`reservePrice:  ${data.reservePrice}`);
  console.log(`description:   ${data.description}`);
};
//----------------------------------------------------//
var getSimulatorData = () =>
  {
    try {
      var data = fs.readFileSync('data.json');
      return JSON.parse(data);
        } catch (e)
        {
          return[];
        }
  };
//----------------------------------------------------//
var getProfiles = () =>
  {
    try {
      var data = fs.readFileSync('user-profile.json');
      return JSON.parse(data);
        } catch (e)
        {
          return[];
        }
  };
//----------------------------------------------------//
var getProfileById = (prosumerId) =>
{
  var profiles = getProfiles();
  var filteredProfiles = profiles.filter((data)=> data.prosumerId === prosumerId.toString());
  return filteredProfiles[0];
};
// Utitlity Functions for adding transaction instances to the log 
//----------------------------------------------------//
var addMeterInstance = (command,prosumerId,amount) =>
{
  var reading = getSimulatorData();
  var instance = {command,prosumerId,amount};

  reading.push(instance);
  saveReading(reading);
  return instance;
};
//----------------------------------------------------//
var addTradeInstance = (command,prosumerIdA,prosumerIdB,amount) =>
{
  var reading = getSimulatorData();
  var instance = {command,prosumerIdA,prosumerIdB,amount};

  reading.push(instance);
  saveReading(reading);
  return instance;
};
//----------------------------------------------------//
var addOfferInstance = (command,prosumerId,listingId,maxBid) =>
{
  var reading = getSimulatorData();
  var instance = {command,prosumerId,listingId,maxBid};

  reading.push(instance);
  saveReading(reading);
  return instance;
};
//----------------------------------------------------//
var addCloseInstance = (command,listingId) =>
{
  var reading = getSimulatorData();
  var instance = {command,listingId};

  reading.push(instance);
  saveReading(reading);
  return instance;
};
// Utitlity Functions for adding asset instances to the log 
//----------------------------------------------------//
var addElectricityInstance = (command,prosumerId,electricityId,amount) =>
{
  var reading = getSimulatorData();
  var instance = {command,prosumerId,electricityId,amount};

  reading.push(instance);
  saveReading(reading);
  return instance;
};
//----------------------------------------------------//
var addProsumerInstance = (command,prosumerId,name,balance,electricityId) =>
{
  var reading = getSimulatorData();
  var instance = {command,prosumerId,name,balance,electricityId};

  reading.push(instance);
  saveReading(reading);
  return instance;
};
//----------------------------------------------------//
var addListingInstance = (command,listingId,electricityId,reservePrice,description) =>
{
  var reading = getSimulatorData();
  var instance = {command,listingId,electricityId,reservePrice,description};

  reading.push(instance);
  saveReading(reading);
  return instance;
};



module.exports = {
  logInstance,
  getSimulatorData,
  getProfiles,
  getProfileById,
  addMeterInstance,
  addTradeInstance,
  addOfferInstance,
  addCloseInstance,
  addElectricityInstance,
  addProsumerInstance,
  addListingInstance,
  saveToSh
};


