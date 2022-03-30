const Migrations = artifacts.require("Migrations");

console.log('this is a migration', Migrations)

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
