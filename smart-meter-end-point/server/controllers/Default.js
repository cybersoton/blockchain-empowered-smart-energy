'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.consumePOST = function consumePOST (req, res, next) {
  var consumeEnergy = req.swagger.params['consumeEnergy'].value;
  Default.consumePOST(consumeEnergy)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPOST = function getPOST (req, res, next) {
  var consumeEnergy = req.swagger.params['consumeEnergy'].value;
  Default.getPOST(consumeEnergy)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
