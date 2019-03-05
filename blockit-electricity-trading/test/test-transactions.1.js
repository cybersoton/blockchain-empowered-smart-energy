/**
 * Part of a course on Hyperledger Fabric:
 * http://ACloudFan.com
 *
 * This is the sample test case used in the lecture
 * "Unit Testing of Network Apps"
 */
const assert = require("chai").assert;

// You need to change this to your specific directory
const utHarness = require("./ut-harness.js");

// This points to the model project folder
const modelFolder = __dirname+"../..";

// Synchronous call so that connections can be established
before((done) => {
  utHarness.debug = false;
  utHarness.initialize(modelFolder, (adminCon, bnCon, definition) => {
    adminConnection = adminCon;
    businessNetworkConnection = bnCon;
    bnDefinition = definition;
    done();
  });
});

const namespace = "org.blockit.electricity";
// const state = "Request_Energy";

// Test Suite # 1
describe("Sample Transaction # Add & Check", () => {
  // Test Case # 1
  // 1. Add an Asset of type "SampleAsset" with value="10"
  // 2. Get the asset instance that was added
  // 3. Assert Equal >> Value in received asset should be "10"
  it("should have produce 10 units of electricity", () => {
    let registry ={};
    // Add the asset
    // Get the asset registry using the BN Connection
    return businessNetworkConnection
        .getAssetRegistry(namespace+"."+"ProduceElectricity")
        .then((reg)=>{
          registry = reg;
          // Get the factory using the BN Definition
          const factory = bnDefinition.getFactory();
          // Create the instance
          const transaction = factory
              .newTransaction(namespace, "ProduceElectricity", "1", 10);
          transaction.prosumer = factory
              .newRelationship(namespace, "Prosumer", "1");
          transaction.setPropertyValue("amount", 10);

          // Add to registry
          return businessNetworkConnection.submitTransaction(transaction);
        }).then((asset)=>{
          // Get the asset now
          return businessNetworkConnection.get("1");
        }).then((transaction)=>{
          // Assert
          assert
              .equal(transaction.amount, "10", "Value not equal or undefined");
        }).catch((error)=>{
          console.log(error);
        });
  });
});

