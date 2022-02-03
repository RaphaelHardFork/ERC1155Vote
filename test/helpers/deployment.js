/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
const { ethers, upgrades } = require('hardhat')

module.exports.deployContracts = async (account) => {
  // Contract.sol
  const Contract = await ethers.getContractFactory('Contract')
  const _contract = await Contract.connect(account).deploy(
    'Name of ERC20',
    'ERC20'
  )

  // UpgradeableContract.sol
  const UpgradeableContract = await ethers.getContractFactory(
    'UpgradeableContract'
  )
  const _upgradeableContract = await upgrades.deployProxy(
    UpgradeableContract,
    ['Name of ERC20', 'ERC20'],
    { kind: 'uups', initializer: '__UpgradeableContract_init' }
  )

  return { _contract, _upgradeableContract }
}
