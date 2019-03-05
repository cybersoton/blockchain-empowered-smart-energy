// This fuction is not used in the main program. However, this is added for
// future work to expand user functions.
/**
 * @param {*} registry This is of type AssetRegistry
 */

const addUser = function(registry, namespace, AssetType, name, ProsumerId, balance, ElectricityId) {
  const factory = startfactory();

  const asset = factory.newResource(namespace, AssetType, name, ProsumerId, balance, ElectricityId);
  asset.setPropertyValue('prosumerId', ProsumerId);
  asset.setPropertyValue('name', name);
  asset.setPropertyValue('balance', balance);
  asset.electricityAvailable = factory.newRelationship('org.blockit.electricity', 'Electricity', ElectricityId);
  return (asset);
};

module.exports = {
  addUser,
};
