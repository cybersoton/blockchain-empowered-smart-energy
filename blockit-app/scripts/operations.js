// --These are the support function for the operators--//
// ----------------------------------------------------//
// ---Future work is merge submit functions------------//
const submitTransaction = function(transaction, bnUtil) {
  return bnUtil.connection.submitTransaction(transaction).then(()=>{
    console.log('3. Transaction Processed and Submitted Successfully!!');
    bnUtil.disconnect();
  }).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const submitAsset = function(asset, bnUtil, registry) {
  return registry.add(asset).then(()=>{
    console.log('3. Resources Added Successfully!!!');
    bnUtil.disconnect();
  }).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const submitUser = function(asset, bnUtil, registry) {
  return registry.add(asset).then(()=>{
    console.log('3. Prosumer Added Successfully!!!');
    bnUtil.disconnect();
  }).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----These are the operators function for blockit----//
// ----------------------------------------------------//
const consume = function(bnUtil, transactions, namespace, prosumerId, amount) {
  const transactionType = 'ConsumeElectricity';
  return bnUtil.connection.getAssetRegistry(namespace+'.'+transactionType).then((registry)=> {
    console.log('2. Received Registry: ', registry.id);
    const transaction = transactions.ConsumeElectricity(registry, namespace, transactionType, prosumerId, amount);

    submitTransaction(transaction, bnUtil);
  }
  ).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const produce = function(bnUtil, transactions, namespace, prosumerId, amount) {
  const transactionType = 'ProduceElectricity';
  return bnUtil.connection.getAssetRegistry(namespace+'.'+transactionType).then((registry)=> {
    console.log('2. Received Registry: ', registry.id);
    const transaction = transactions.ProduceElectricity(registry, namespace, transactionType, prosumerId, amount);

    submitTransaction(transaction, bnUtil);
  }
  ).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const trade = function(bnUtil, transactions, namespace, prosumerId, amount) {
  const transactionType = 'TradeElectricity';
  return bnUtil.connection.getAssetRegistry(namespace+'.'+transactionType).then((registry)=> {
    console.log('2. Received Registry: ', registry.id);
    const transaction = transactions.ProduceElectricity(registry, namespace, transactionType, prosumerIdA, prosumerIdB, amount);

    submitTransaction(transaction, bnUtil);
  }
  ).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const offer = function(bnUtil, transactions, namespace, bid, listingId, prosumerId) {
  const transactionType = 'Offer';
  return bnUtil.connection.getAssetRegistry(namespace+'.'+transactionType).then((registry)=> {
    console.log('2. Received Registry: ', registry.id);
    const transaction = transactions.makeOffer(registry, namespace, transactionType, bid, listingId, prosumerId);

    submitTransaction(transaction, bnUtil);
  }
  ).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const close = function(bnUtil, transactions, namespace, listingId) {
  const transactionType = 'CloseBidding';
  return bnUtil.connection.getAssetRegistry(namespace+'.'+transactionType).then((registry)=> {
    console.log('2. Received Registry: ', registry.id);
    const transaction = transactions.closeBidding(registry, namespace, transactionType, listingId);

    submitTransaction(transaction, bnUtil);
  }
  ).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const elec = async function(bnUtil, assets, namespace, electricityId, prosumerId, amount) {
  const AssetType = 'Electricity';
  return bnUtil.connection.getAssetRegistry(namespace+'.'+AssetType).then((registry)=> {
    console.log('2. Received Registry: ', registry.id);
    const asset = assets.addElectricity(registry, namespace, AssetType, electricityId, prosumerId, amount);

    submitAsset(asset, bnUtil, registry);
  }
  ).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const listing = function(bnUtil, assets, namespace, listingId, electricityId, reservePrice, description, state) {
  const AssetType = 'EnergyRequest';
  return bnUtil.connection.getAssetRegistry(namespace+'.'+AssetType).then((registry)=> {
    console.log('2. Received Registry: ', registry.id);
    const asset = assets.addElectricityListing(registry, namespace, AssetType, listingId, electricityId, reservePrice, description, state);

    submitAsset(asset, bnUtil, registry);
  }
  ).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};
// ----------------------------------------------------//
const prosumer = async function(bnUtil, assets, namespace, name, ProsumerId, balance, ElectricityId) {
  const AssetType = 'Prosumer';
  return bnUtil.connection.getParticipantRegistry(namespace+'.'+AssetType).then((registry)=> {
    console.log('2. Received Registry: ', registry.id);
    const asset = assets.addUser(registry, namespace, AssetType, name, ProsumerId, balance, ElectricityId);

    submitUser(asset, bnUtil, registry);
  }
  ).catch((error)=>{
    console.log(error);
    bnUtil.disconnect();
  });
};

module.exports = {
  consume,
  produce,
  trade,
  offer,
  close,
  elec,
  listing,
  prosumer,
};
