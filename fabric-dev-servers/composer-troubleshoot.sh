#!/usr/bin/env sh
kill -9 $(pgrep node)
export FABRIC_VERSION=hlfv12
./stopFabric.sh
./teardownFabric.sh
./createPeerAdminCard.sh
./startFabric.sh

composer network install -a ../blockchain-empowered-smart-energy/blockit-electricity-trading/dist/electricity-trading-network@0.0.9.bna -c PeerAdmin@hlfv1

composer network start -c PeerAdmin@hlfv1 -n electricity-trading-network -V 0.0.9 -A admin -S adminpw

composer card import -f admin@electricity-trading-network.card -c admin@electricity-trading-network

composer-rest-server -c admin@electricity-trading-network -n never -u true -w true & composer-playground