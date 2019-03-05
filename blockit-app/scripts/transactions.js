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
const ConsumeElectricity = function(registry, namespace, transactionType, prosumerId, amount) {
  const factory = startfactory();
  const options = {
    generate: false,
    includeOptionalFields: false,
  };
  const transaction = factory.newTransaction(namespace, transactionType, prosumerId, amount, options);

  transaction.prosumer = factory.newRelationship(namespace, 'Prosumer', prosumerId);
  transaction.setPropertyValue('amount', amount);
  return (transaction);
};
// ----------------------------------------------------//
const ProduceElectricity = function(registry, namespace, transactionType, prosumerId, amount) {
  const factory = startfactory();
  const options = {
    generate: false,
    includeOptionalFields: false,
  };
  const transaction = factory.newTransaction(namespace, transactionType, prosumerId, amount, options);

  transaction.prosumer = factory.newRelationship(namespace, 'Prosumer', prosumerId);
  transaction.setPropertyValue('amount', amount);
  return (transaction);
};
// ----------------------------------------------------//
const TradeElectricity = function(registry, namespace, transactionType, prosumerIdA, prosumerIdB, amount) {
  const factory = startfactory();
  const options = {
    generate: false,
    includeOptionalFields: false,
  };
  const transaction = factory.newTransaction(namespace, transactionType, prosumerIdA, prosumerIdB, amount, options);

  transaction.prosumerA = factory.newRelationship(namespace, 'Prosumer', prosumerIdA);
  transaction.prosumerB = factory.newRelationship(namespace, 'Prosumer', prosumerIdB);
  transaction.setPropertyValue('amount', amount);

  return (transaction);
};
// ----------------------------------------------------//
const makeOffer = function(registry, namespace, transactionType, bid, listingId, prosumerId, transactionId) {
  const factory = startfactory();
  const options = {
    generate: false,
    includeOptionalFields: false,
  };

  const transaction = factory.newTransaction(namespace, transactionType, prosumerId, listingId, bid, options);

  transaction.setPropertyValue('bidPrice', bid);
  transaction.listing = factory.newRelationship(namespace, 'EnergyRequest', listingId);
  transaction.prosumer = factory.newRelationship(namespace, 'Prosumer', prosumerId);

  return (transaction);
};
// ----------------------------------------------------//
const closeBidding = function(registry, namespace, transactionType, listingId) {
  const factory = startfactory();
  const options = {
    generate: false,
    includeOptionalFields: false,
  };

  const transaction = factory.newTransaction(namespace, transactionType, listingId, options);

  transaction.listing = factory.newRelationship(namespace, 'EnergyRequest', listingId);
  return (transaction);
};

module.exports = {
  ConsumeElectricity,
  ProduceElectricity,
  TradeElectricity,
  makeOffer,
  closeBidding,
};
