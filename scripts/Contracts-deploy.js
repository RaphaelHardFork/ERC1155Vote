/* eslint-disable comma-dangle */
const { ethers, upgrades } = require('hardhat')
const hre = require('hardhat')
const { deployed } = require('./utils/deployed')

const CONTRACT_NAME = 'Contract'
const UPGRADEABLE_CONTRACT_NAME = 'UpgradeableContract'

const main = async () => {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  // Contract.sol
  const Contract = await hre.ethers.getContractFactory(CONTRACT_NAME)
  const contract = await Contract.deploy('Name of ERC20', 'ERC20')
  await contract.deployed()
  await deployed(CONTRACT_NAME, hre.network.name, contract.address, [
    'Name of ERC20',
    'ERC20',
  ])

  // UpgradeableContract.sol
  const UpgradeableContract = await ethers.getContractFactory(
    UPGRADEABLE_CONTRACT_NAME
  )
  const upgradeableContract = await upgrades.deployProxy(
    UpgradeableContract,
    ['Name of ERC20', 'ERC20'],
    { kind: 'uups', initializer: '__UpgradeableContract_init' }
  )
  await upgradeableContract.deployed()
  await deployed(
    UPGRADEABLE_CONTRACT_NAME,
    hre.network.name,
    upgradeableContract.address,
    undefined, // no constructor in upgrdeable contracts
    await upgrades.erc1967.getImplementationAddress(upgradeableContract.address)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
