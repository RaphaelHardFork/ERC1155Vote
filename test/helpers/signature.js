/* eslint-disable comma-dangle */
const { signTypedData } = require('@metamask/eth-sig-util')
const { ethers } = require('ethers')

/*
These functions are adapted to the utilisation of MinimalForwarder.sol
https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/metatx

Signature are done with {eth_signTypedData_v4}
 */

module.exports.signTransaction = (
  privateKey,
  minimalForwarderAddress,
  chainId,
  message
) => {
  privateKey = Buffer.from(privateKey.slice(2), 'hex')

  // transaction to minimal forwarder
  const domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ]

  // SHOULD be changed if different domain name
  const domainData = {
    name: 'MinimalForwarder',
    version: '0.0.1',
    chainId: chainId,
    verifyingContract: minimalForwarderAddress,
  }

  const forwardRequest = [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'gas', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'data', type: 'bytes' },
  ]

  const data = {
    types: { EIP712Domain: domain, ForwardRequest: forwardRequest },
    domain: domainData,
    primaryType: 'ForwardRequest',
    message: message,
  }

  // Version of the signature can be changed here: https://metamask.github.io/eth-sig-util/modules.html#signTypedData
  const signature = signTypedData({ privateKey, data, version: 'V4' })

  return [data, signature]
}

module.exports.createForwardRequest = (from, to, value, gas, nonce, data) => {
  const message = {
    title: 'This is a test message',
    describe:
      'No need to configure this in test, only a wallet display feature',
    from,
    to,
    value,
    gas,
    nonce,
    data,
  }
  const request = [from, to, value, gas, nonce, data]

  return [message, request]
}

module.exports.createData = (functionSignature, typeArray, valueArray) => {
  const signature = ethers.utils.id(functionSignature).substring(0, 10)

  const encodedParameters = ethers.utils.defaultAbiCoder
    .encode(typeArray, valueArray)
    .slice(2) // remove 0x

  return signature + encodedParameters
}
