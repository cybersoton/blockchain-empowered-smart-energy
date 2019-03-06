# BlockIT: Blockchain-Empowered-Smart-Energy

The BlockIT project is developed under the [Petras](https://www.petrashub.org/portfolio-item/blockchain-empowered-infrastructure-for-iot-blockit/) Umbrealla.  <img src="https://www.petrashub.org/wp-content/uploads/2018/06/BlockIT-1200x598.png" class="attachment-entry-fullwidth size-entry-fullwidth wp-post-image" alt="">

This project looks how blockchain, the technology behind decentralised systems such as Bitcoin, can be exploited to make the Infrastructure of IoT more resilient.  This project will use blockchain to connect and coordinate IoT devices, enabling them to share their data with guarantees that their integrity will be preserved and privacy protected.




## This project has 3 parts
- Blockchain infrastrucuture using Hyperledger-Fabric that encapsulate the transactions and assets in the microgird.
- Node.js server exposing API to interact the Distributed Infrastructure [BlockIT](https://github.com/cybersoton/blockchain-empowered-smart-energy). The server is indeed an interface used by the BlockIT platform components to interact with the blockchain system in a micro-grid.
- Data generator to test the blockchain transaction that can be expanded to emulate patern of life functions. 

## Installation Guide

Installing the development environment
======================================

Follow these instructions to obtain the Hyperledger Composer development tools (primarily used to _create_ Business Networks) and stand up a Hyperledger Fabric (primarily used to _run/deploy_ your Business Networks locally). Note that the Business Networks you create can also be deployed to Hyperledger Fabric runtimes in other environments e.g. on a cloud platform.

Before you begin
----------------
To run Hyperledger Composer and Hyperledger Fabric, we recommend you have at least 4Gb of memory.

The following are prerequisites for installing the required development tools:

*   Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
*   Docker Engine: Version 17.03 or higher
*   Docker-Compose: Version 1.8 or higher
*   Node: 8.9 or higher (note version 9 is not supported)
*   npm: v5.x
*   git: 2.9.x or higher
*   Python: 2.7.x
*   A code editor of your choice, we recommend VSCode.

\*\*If installing Hyperledger Composer using Linux, be aware of the following advice:

*   Login as a normal user, rather than root.
*   Do not `su` to root.
*   When installing prerequisites, use curl, then unzip using sudo.
*   Run prereqs-ubuntu.sh as a normal user. It may prompt for root password as some of it's actions are required to be run as root.
*   Do not use npm with `sudo` or `su` to root to use it.
*   Avoid installing node globally as root.\*\*

If you're running on Ubuntu, you can download the prerequisites using the following commands:

Copy

    curl -O https://hyperledger.github.io/composer/v0.19/prereqs-ubuntu.sh
    
    chmod u+x prereqs-ubuntu.sh
    

Next run the script - as this briefly uses sudo during its execution, you will be prompted for your password.

Copy

    ./prereqs-ubuntu.sh
    
Make sure you have installed the required pre-requisites, following the instructions in [**Installing pre-requisites**](../installing/installing-prereqs.html).

These instructions assume that you've not installed the tools and used them before. If this is not the case, you might want to check that your previous setup is completely destroyed before you start following this guide. 

> To provide flexibility and enable the maximum number of dev, test and deployment scenarios, Composer is delivered as a set of components you can install with `npm` and control from the CLI. These instructions will tell you how to install everything first, then how to control your development environment.

Installing components
=====================

### Step 1: Install the CLI tools

There are a few useful CLI tools for Composer developers. The most important one is `composer-cli`, which contains all the essential operations, so we'll install that first. Next, we'll also pick up `generator-hyperledger-composer`, `composer-rest-server` and `Yeoman` plus the `generator-hyperledger-composer`. Those last 3 are not core parts of the development environment, but they'll be useful if you're following the tutorials or developing applications that interact with your Business Network, so we'll get them installed now.

Note that you **should not** use `su` or `sudo` for the following npm commands.

1.  Essential CLI tools:
    
    Copy
    
        npm install -g composer-cli@0.19
        
    
2.  Utility for running a REST Server on your machine to expose your business networks as RESTful APIs:
    
    Copy
    
        npm install -g composer-rest-server@0.19
        
    
3.  Useful utility for generating application assets:
    
    Copy
    
        npm install -g generator-hyperledger-composer@0.19
        
    
4.  Yeoman is a tool for generating applications, which utilises `generator-hyperledger-composer`:
    
    Copy
    
        npm install -g yo
        
    

### Step 2: Install Playground

If you've already tried Composer online, you'll have seen the browser app "Playground". You can run this locally on your development machine too, giving you a UI for viewing and demonstrating your business networks.

1.  Browser app for simple editing and testing Business Networks:
    
    Copy
    
        npm install -g composer-playground@0.19
        
    

### Step 3: Set up your IDE

Whilst the browser app _can_ be used to work on your Business Network code, most users will prefer to work in an IDE. Our favourite is `VSCode`, because a Composer extension is available.

1.  Install VSCode from this URL: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
    
2.  Open VSCode, go to Extensions, then search for and install the `Hyperledger Composer` extension from the Marketplace.
    

### Step 4: Install Hyperledger Fabric

This step gives you a local Hyperledger Fabric runtime to deploy your business networks to.

1.  In a directory of your choice (we will assume `~/fabric-dev-servers`), get the `.tar.gz` file that contains the tools to install Hyperledger Fabric:
    
    Copy
    
        mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers
        
        curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
        tar -xvf fabric-dev-servers.tar.gz
        
    
    A `zip` is also available if you prefer: just replace the `.tar.gz` file with `fabric-dev-servers.zip` and the `tar -xvf` command with a `unzip` command in the preceding snippet.
    
2.  Use the scripts you just downloaded and extracted to download a local Hyperledger Fabric v1.1 runtime:
    
    Copy
    
        cd ~/fabric-dev-servers
        export FABRIC_VERSION=hlfv11
        ./downloadFabric.sh
        
    

> Congratulations, you've now installed everything required for the typical Developer Environment. Read on to learn some of the most common things you'll do with this environment to develop and test your Blockchain Business Networks.

### Step 5: Start the app ("BlockIT")


To start the app, run:

Copy

        clone git@github.com:cybersoton/blockchain-empowered-smart-energy.git
        cp composer-troubleshoot.sh fabric-dev-servers/
        cd fabric-dev-servers
        ./ composer-troubleshoot.sh

This script will automatically install & Start the BlockIT bussiness network. It will also import you admin card and start composer playground to expose the BlockIT blockchain infrastrucute so you can see the data models and experiment with it. 

You can interact with the blockchain directly by 

Copy

        cd blockchain-empowered-smart-energy/blockit-app/scripts
        npm install
        node blockit-app.js --help
This will show you all the functions that you can excute using the cli

If you want to generte some transaction to test

Copy

        cd blockchain-empowered-smart-energy/blockit-simulator
        node dataGenerator.js
        node shParser.js

The generator will import the user profiles from `~user-profiles.json` and create the data in `~data.json`then the shParser will create the transaction to run using `~blockit-app.js`

just copy the `~simulator.sh` into `~blockchain-empowered-smart-energy/blockit-app/scripts` folder and run it. 

Controlling your dev environment
================================

Starting and stopping Hyperledger Fabric
----------------------------------------

You control your runtime using a set of scripts which you'll find in `~/fabric-dev-servers` if you followed the suggested defaults.

The first time you start up a new runtime, you'll need to run the start script, then generate a PeerAdmin card:

Copy

        cd ~/fabric-dev-servers
        export FABRIC_VERSION=hlfv11
        ./startFabric.sh
        ./createPeerAdminCard.sh
    

You can start and stop your runtime using `~/fabric-dev-servers/stopFabric.sh`, and start it again with `~/fabric-dev-servers/startFabric.sh`.

At the end of your development session, you run `~/fabric-dev-servers/stopFabric.sh` and then `~/fabric-dev-servers/teardownFabric.sh`. Note that if you've run the teardown script, the next time you start the runtime, you'll need to create a new PeerAdmin card just like you did on first time startup.

> The local runtime is intended to be frequently started, stopped and torn down, for development use. If you're looking for a runtime with more persistent state, you'll want to run one outside of the dev environment, and deploy Business Networks to it. Examples of this include running it via Kubernetes, or on a managed platform such as IBM Cloud.





