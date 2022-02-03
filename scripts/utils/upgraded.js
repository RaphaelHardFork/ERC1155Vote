/* eslint-disable comma-dangle */
const { readFile, writeFile } = require('fs/promises')
const chalk = require('chalk')

const FILE_PATH = './scripts/deployed.json'
/*
  This function should be called after a successful upgrade of a proxy contract in your scripts.
  It will update the file named deployed.json containing deployment informations of your smart contracts.
  DO NOT EDIT deployed.json MANUALLY, this is an automatically generated file.

  MANDATORY informations are {contractName}, {networkName} and {address}
  ADDITIONAL informations can be specified:
    - {constructorArgs} array of arguments for the constructor, used to verify contract.
    - {implementationAddress} address of the implementation address in case
    of utilisation of proxy contract.
*/
exports.upgraded = async (
  contractName,
  networkName,
  address,
  newImplementationAddress
) => {
  console.log(
    chalk.green.bold(
      `${contractName} upgraded on ${networkName} at ${address} with new implementation: ${newImplementationAddress}`
    )
  )
  console.log(
    chalk.green(
      `updating ${FILE_PATH} with ${contractName} on ${networkName} at ${address}`
    )
  )
  // Open and Read current FILE_PATH if exists
  let jsonString = ''
  let obj = {}
  try {
    jsonString = await readFile(FILE_PATH, 'utf-8')
    obj = JSON.parse(jsonString)
  } catch (e) {
    // If does not exist, do nothing
  }
  const _addrObj = {}
  const _chainObj = {}
  let _networksObj = {}
  _addrObj.implementationAddress = newImplementationAddress

  _chainObj[networkName] = _addrObj
  _networksObj = { ...obj[contractName], ..._chainObj }
  obj[contractName] = _networksObj
  jsonString = JSON.stringify(obj)

  try {
    await writeFile(FILE_PATH, jsonString)
  } catch (e) {
    console.log(e.message)
    throw e
  }
}
