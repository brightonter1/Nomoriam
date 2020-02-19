var Nomoriam = artifacts.require("./Nomoriam");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Nomoriam, {from: accounts[0]});
};
