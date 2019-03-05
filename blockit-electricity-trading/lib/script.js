/*eslint-disable */
/**
 * Function to trade electricity between consumer and producer
 * @param {org.blockit.electricity.TradeElectricity} trade The electrictiy trade instance
 * @transaction
 */
async function TradeElectricity(trade) {
  const assetRegistry = await getAssetRegistry("org.blockit.electricity.Electricity");

  trade.prosumerA.electricityAvailable.electricityAmount = trade.prosumerA.electricityAvailable.electricityAmount - trade.amount;
  trade.prosumerB.electricityAvailable.electricityAmount = trade.prosumerA.electricityAvailable.electricityAmount + trade.amount;

  await assetRegistry.update(trade.prosumerA.electricityAvailable);
  await assetRegistry.update(trade.prosumerB.electricityAvailable);
}

/**
 * Function to add produced electricity to producer tally
 * @param {org.blockit.electricity.ProduceElectricity} produce The electricity produced instance
 * @transaction
 */
async function ProduceElectricity(produce) {
  const assetRegistry = await getAssetRegistry("org.blockit.electricity.Electricity");

  produce.prosumer.electricityAvailable.electricityAmount = produce.prosumer.electricityAvailable.electricityAmount + produce.amount;

  await assetRegistry.update(produce.prosumer.electricityAvailable);
}

/**
 * Function to add consume electricity to consume tally
 * @param {org.blockit.electricity.ConsumeElectricity} consume The electricity consumed instance
 * @transaction
 */
async function ConsumeElectricity(consume) {
  const assetRegistry = await getAssetRegistry("org.blockit.electricity.Electricity");
  if (consume.amount < consume.prosumer.electricityAvailable.electricityAmount) {
    consume.prosumer.electricityAvailable.electricityAmount = consume.prosumer.electricityAvailable.electricityAmount - consume.amount;
    await assetRegistry.update(consume.prosumer.electricityAvailable);
  }
}

const addElectricityListing = function(registry, namespace, AssetType, listing, ElectricityId, reservePrice, description, state) {
  // 3. This Array will hold the instances of electricity resource
  const factory = startfactory();

  const asset = factory.newResource(namespace, AssetType, listing, ElectricityId, reservePrice, description, state);
  asset.setPropertyValue("RequestId", listing);
  asset.setPropertyValue("maxPrice", reservePrice);
  asset.setPropertyValue("description", description);
  asset.setPropertyValue("state", state);
  asset.electricity = factory.newRelationship("org.blockit.electricity", "Electricity", ElectricityId);

  return (asset);
};

/**
 * Make an Offer for Energy Request
 * @param {org.blockit.electricity.Offer} offer - the offer
 * @transaction
 */
async function makeOffer(offer) { // eslint-disable-line no-unused-vars
  const listing = offer.listing;
  if (listing.state !== "Request_Energy") {
    throw new Error("Energy is not FOR SALE");
  }
  if (!listing.offers) {
    listing.offers = [];
  }
  listing.offers.push(offer);

  // save the energy listing
  const EnergyListingRegistry = await getAssetRegistry("org.blockit.electricity.EnergyRequest");
  await EnergyListingRegistry.update(listing);
}

/**
 * Close the bidding for a electricity listing and choose the
 * highest bid that is over the asking price
 * @param {org.blockit.electricity.CloseBidding} closeBidding - the closeBidding transaction
 * @transaction
 */
async function closeBidding(closeBidding) { // eslint-disable-line no-unused-vars
  const listing = closeBidding.listing;
  if (listing.state !== "Request_Energy") {
    throw new Error("Energy is not FOR SALE");
  }
  // by default we mark the listing as Request_Not_Met
  listing.state = "Request_Not_Met";
  let lowestOffer = null;
  let buyer = null;
  let seller = null;
  if (listing.offers && listing.offers.length > 0) {
    // sort the bids by bidPrice
    listing.offers.sort(function(a, b) {
      return (a.bidPrice - b.bidPrice);
    });
    lowestOffer = listing.offers[0];
    if (lowestOffer.bidPrice <= listing.maxPrice) {
      // mark the request as met
      listing.state = "Request_Met";
      buyer = lowestOffer.prosumer;
      seller = listing.electricity.prosumer;
      // update the balance of the seller
      console.log("#### seller balance before: " + seller.balance);
      seller.balance += lowestOffer.bidPrice;
      console.log("#### seller balance after: " + seller.balance);
      // update the balance of the buyer
      console.log("#### buyer balance before: " + buyer.balance);
      buyer.balance -= lowestOffer.bidPrice;
      console.log("#### buyer balance after: " + buyer.balance);
      // transfer the energy to the buyer
      listing.electricity.prosumer = buyer;
      // clear the offers
      listing.offers = null;
    }
    if (lowestOffer.bidPrice >= listing.maxPrice) {
      // mark the request as not met
      // use this for future work to add conditional transaction from grid
      listing.state = "Request_Not_Met";
      const lowestOffer = null;
      const buyer = null;
      const seller = null;
      listing.offers = null;
    }
  }

  if (lowestOffer) {
    // save the energy
    const EnergyRegistry = await getAssetRegistry("org.blockit.electricity.Electricity");
    await EnergyRegistry.update(listing.electricity);
  }

  // save the energy listing
  const EnergyListingRegistry = await getAssetRegistry("org.blockit.electricity.EnergyRequest");
  await EnergyListingRegistry.update(listing);

  if (listing.state === "Request_Met") {
    // save the buyer
    const userRegistry = await getParticipantRegistry("org.blockit.electricity.Prosumer");
    await userRegistry.updateAll([buyer, seller]);
  }
}
/* eslint-enable */
