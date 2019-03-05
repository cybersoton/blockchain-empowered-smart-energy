/**
 * @param {*} registry This is of type AssetRegistry
 */
const startfactory = ()=>{
  const bnUtil = require('./bn-connection-util');
  const bnDef = bnUtil.connection.getBusinessNetwork();
  const factory = bnDef.getFactory();
  return (factory);
};
// ----------------------------------------------------//
const addElectricityListing = function(registry, namespace, AssetType, listingId, ElectricityId, reservePrice, description, state) {
  // 3. This Array will hold the instances of electricity resource
  const factory = startfactory();

  const asset = factory.newResource(namespace, AssetType, listingId, ElectricityId, reservePrice, description, state);
  asset.setPropertyValue('RequestId', listingId);
  asset.setPropertyValue('maxPrice', reservePrice);
  asset.setPropertyValue('description', description);
  asset.setPropertyValue('state', state);
  asset.electricity = factory.newRelationship('org.blockit.electricity', 'Electricity', ElectricityId);

  return (asset);
};


// ----------------------------------------------------//
const addElectricity = function(registry, namespace, AssetType, ElectricityId, ProsumerId, ElectricityAmount) {
  const factory = startfactory();

  const asset = factory.newResource(namespace, AssetType, ElectricityId, ProsumerId, ElectricityAmount);
  asset.setPropertyValue('electricityId', ElectricityId);
  asset.setPropertyValue('electricityAmount', ElectricityAmount);
  asset.prosumer = factory.newRelationship('org.blockit.electricity', 'Prosumer', ProsumerId);

  return (asset);
};
// ----------------------------------------------------//
const addUser = function(registry, namespace, AssetType, name, ProsumerId, balance, ElectricityId) {
  const factory = startfactory();

  const asset = factory.newResource(namespace, AssetType, name, ProsumerId, balance, ElectricityId);
  // asset.prosumer = factory.newRelationship('org.blockit.electricity', 'Prosumer',ProsumerId);
  asset.setPropertyValue('prosumerId', ProsumerId);
  asset.setPropertyValue('name', name);
  asset.setPropertyValue('balance', balance);
  asset.electricityAvailable = factory.newRelationship('org.blockit.electricity', 'Electricity', ElectricityId);
  return (asset);
};

module.exports = {
  addElectricityListing,
  addElectricity,
  addUser,
};
