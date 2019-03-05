/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * This is the sample test case used in the lecture
 * "Unit Testing of Network Apps"
 */
var assert = require('chai').assert;

// You need to change this to your specific directory
const utHarness = require('./ut-harness.js');

// This points to the model project folder
var modelFolder = __dirname+'../../../blockit-electricity-trading/';

var adminConnection = {}
var businessNetworkConnection = {}
var bnDefinition = {}



// Synchronous call so that connections can be established
before((done) => {
    utHarness.debug = false;
    utHarness.initialize(modelFolder, (adminCon, bnCon, definition) => {
        adminConnection = adminCon;
        businessNetworkConnection = bnCon;
        bnDefinition = definition;
        done();
    });
})

const namespace = 'org.blockit.electricity';
const AssetType = 'Electricity';
const state     = "Request_Energy";

// Test Suite # 1
describe('Sample Asset # Add & Check', () => {

    // Test Case # 1
    // 1. Add an Asset of type "SampleAsset" with value="10"
    // 2. Get the asset instance that was added
    // 3. Assert Equal >> Value in received asset should be "10"
    it('should have 1 Electricty asset instance with value=10', () => {
        let registry ={}
        // Add the asset
        // Get the asset registry using the BN Connection
        return businessNetworkConnection.getAssetRegistry(namespace+'.'+AssetType).then((reg)=>{
            registry = reg;
            // Get the factory using the BN Definition
            const  factory = bnDefinition.getFactory();
            // Create the instance
            let asset = factory.newResource(namespace,AssetType,'1','1',10);
                asset.setPropertyValue('electricityId', '1');
                asset.setPropertyValue('electricityAmount', 10);
                asset.prosumer = factory.newRelationship('org.blockit.electricity', 'Prosumer','1');
    
            // Add to registry
            return registry.add(asset);
        }).then((asset)=>{

            // Get the asset now
            return registry.get('1');
        }).then((asset)=>{

            // Assert
            assert.equal(asset.electricityId,"1","Value not equal or undefined");
        }).catch((error)=>{
            console.log(error);
        });
    });


});


