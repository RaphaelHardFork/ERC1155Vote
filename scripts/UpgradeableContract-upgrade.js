/* eslint-disable comma-dangle */
const { ethers, upgrades } = require('hardhat')
const hre = require('hardhat')
const { readFile } = require('fs/promises')
const { upgraded } = require('./utils/upgraded')

const CONTRACT_NAME = 'UpgradeableContract'

const main = async () => {
  const [deployer] = await ethers.getSigners()
  console.log('Upgrading contracts with the account:', deployer.address)

  const CONTRACTS_DEPLOYED = JSON.parse(
    await readFile('./scripts/deployed.json', 'utf-8')
  )
  const DEPLOYED_CONTRACT_ADDRESS =
    CONTRACTS_DEPLOYED[CONTRACT_NAME][hre.network.name].address

  const UpgradeableContract = await hre.ethers.getContractFactory(CONTRACT_NAME)
  const upgradeableContract = await UpgradeableContract.attach(
    DEPLOYED_CONTRACT_ADDRESS
  )

  const UpgradeableContractV2 = await hre.ethers.getContractFactory(
    'UpgradeableContractV2'
  )
  await upgrades.upgradeProxy(
    upgradeableContract.address,
    UpgradeableContractV2
  )

  await upgraded(
    CONTRACT_NAME,
    hre.network.name,
    upgradeableContract.address,
    await upgrades.erc1967.getImplementationAddress(upgradeableContract.address)
  )
  console.log(`Proxy contract: ${upgradeableContract.address} upgraded`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
