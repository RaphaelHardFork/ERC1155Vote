/* eslint-disable comma-dangle */
/* eslint-disable dot-notation */
const { run } = require('hardhat')
const hre = require('hardhat')
const { readFile } = require('fs/promises')

const main = async () => {
  const CONTRACTS_DEPLOYED = JSON.parse(
    await readFile('./scripts/deployed.json', 'utf-8')
  )
  const contract = CONTRACTS_DEPLOYED['Contract'][hre.network.name]
  const upgradeableContract =
    CONTRACTS_DEPLOYED['UpgradeableContract'][hre.network.name]

  // Contract.sol
  try {
    await run('verify:verify', {
      address: contract.address,
      constructorArguments: contract.constructorArguments,
      contract: 'contracts/Contract.sol:Contract', // useful when several same bytecode in artifacts
    })
  } catch (e) {
    console.log(e)
  }

  // UpgradeableContract.sol
  try {
    await run('verify:verify', {
      address: upgradeableContract.implementationAddress,
    })
  } catch (e) {
    console.log(e)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
