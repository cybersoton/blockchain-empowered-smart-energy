// Load nodejs modules
// Load third party modules
const _ = require('lodash');
const yargs = require('yargs');
// Load BlockIT Constants
const namespace = 'org.blockit.electricity';
const state = 'Request_Energy';
// Load built modules
const bnUtil = require('./bn-connection-util');
const transactions = require('./transactions');
const operations = require('./operations');
const assets = require('./assets');
// BlockIT application synatx
const prosumerId ={Describe: 'Prosumer ID',
  demand: true,
  string: true,
  alias: 'p'};
const electricityId ={Describe: 'Electricity ID',
  demand: true,
  string: true,
  alias: 'e'};
const listingId ={Describe: 'Listing ID',
  demand: true,
  string: true,
  alias: 'l'};
const prosumerIdA ={Describe: 'Prosumer ID for party A',
  demand: true,
  string: true,
  alias: 'pa'};
const prosumerIdB ={Describe: 'Prosumer ID for party B',
  demand: true,
  string: true,
  alias: 'pb'};
const amount ={Describe: 'Amount of Electricity',
  demand: true,
  alias: 'a'};
const balance ={Describe: 'Money Balance',
  demand: true,
  alias: 'bl'};
const bid ={Describe: 'Bid for Electricity',
  demand: true,
  alias: 'b'};
const reservePrice ={Describe: 'Amount of Electricity',
  demand: true,
  alias: 'r'};
const name ={Describe: 'Name of Prosumer',
  demand: false,
  string: true,
  alias: 'n'};
const requestAmount ={Describe: 'Amount to be requested',
  demand: true,
  alias: 'rq'};
// Loading yargs returned argument for transactions
const argv=yargs
    .command('consume', 'Consume Electricity', {prosumerId: prosumerId, amount: amount})
    .command('produce', 'Produce Electricity', {prosumerId: prosumerId, amount: amount})
    .command('trade', 'Trade Electricity ', {prosumerIdA: prosumerIdA, prosumerIdB: prosumerIdB, amount: amount})
    .command('offer', 'Make Offer', {prosumerId: prosumerId, listingId: listingId, bid: bid})
    .command('close', 'Close Bidding', {listingId: listingId})
// Loading yargs returned argument for assets
    .command('electricity', 'addElectricity', {prosumerId: prosumerId, amount: amount, electricityId: electricityId})
    .command('listing', 'Add Listing', {listingId: listingId, reservePrice: reservePrice, requestAmount: requestAmount, electricityId: electricityId})
    .command('prosumer', 'Add Prosumer', {prosumerId: prosumerId, name: name, balance: balance, electricityId: electricityId})
// Loading yargs returned argument for seeding Blockit
    .help()
    .argv;


// Open a connection to the blockchain
bnUtil.connect(main);

function main(error) {
// Check for error
  if (error) {
    console.log(error);
    process.exit(1);
  }
  // Get the Business Network Definition
  const bnDef = bnUtil.connection.getBusinessNetwork();
  console.log('1. Received Definition from Runtime: ',
      bnDef.getName(), '  ', bnDef.getVersion());
  // App started by loading a command on argv by loading first value
  const command = argv._[0];
  // Check command then load the correct operator
  // ----------------------------------------------------//
  // -------------------Transaction commands-------------//
  if (command === 'consume') {
    operations.consume(bnUtil, transactions, namespace, argv.prosumerId, argv.amount);
  }
  // ----------------------------------------------------//
  if (command === 'produce') {
    operations.produce(bnUtil, transactions, namespace, argv.prosumerId, argv.amount);
  }
  // ----------------------------------------------------//
  if (command === 'trade') {
    operations.trade(bnUtil, transactions, namespace, argv.prosumerIdA, argv.prosumerIdB, argv.amount);
  }
  // ----------------------------------------------------//
  if (command === 'offer') {
    operations.offer(bnUtil, transactions, namespace, argv.bid, argv.listingId, argv.prosumerId);
  }
  // ----------------------------------------------------//
  if (command === 'close') {
    operations.close(bnUtil, transactions, namespace, argv.listingId);
  }
  // --------------------assets commands-----------------//
  // ----------------------------------------------------//
  if (command === 'electricity') {
    operations.elec(bnUtil, assets, namespace, argv.electricityId, argv.prosumerId, argv.amount);
  }
  // ----------------------------------------------------//
  if (command === 'listing') {
    operations.listing(bnUtil, assets, namespace, argv.listingId, argv.electricityId, argv.reservePrice, argv.requestAmount, state);
  }
  // ----------------------------------------------------//
  if (command === 'prosumer') {
    operations.prosumer(bnUtil, assets, namespace, argv.name, argv.prosumerId, argv.balance, argv.electricityId);
  }
}


