# blockit-electricity-trading

BlockIT energy trading application for IOT devices
# BlockIT-empowered Infrastructure for IoT (BlockIT)

This hyperledger implementation BlockIT energy trading application for IOT devices. BlockIT is a project under the [Petras Umbrella](https://www.petrashub.org/portfolio-item/blockchain-empowered-infrastructure-for-iot-blockit/).
#

This repository contains the blockchain models, transaction logic and queries. This piece of code enables five functions to support energy tranactions between peers. 

## Instructions

- Upon deployment, make sure you create the assets and participants. Also keep track of the ID's used. Make sure the ID's match the tranaction ID when testing in composer-playground. 
- Upon deployment, configure the permission.acl file to allow authorised prosumers to interact with other prosumers to request and offer energy.



## Functions

This instance has five functions:
1. Trade Energy
2. Consume Energy
3. Produce Energy
4. Offer Energy
5. Close Offer

This is configured for subtractive bidding to find the lowest energy price to buy. To configure it to for the highest offer, reverse the sort algorithim and the condition (instructions in the comments of script.js).

## Limitations

Trade, Consume and Produce are built to be support functions so they are limited to one energy asset instance and one energy request. Therfore is unable to handle multiple assests belonging to the same prosumer. 

## Futurework

- Add queries to the queries.qry file.
- Implement both subtractive and additive bidding functions.