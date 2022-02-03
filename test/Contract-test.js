/* eslint-disable no-unused-vars */
const { expect } = require('chai')
const { ethers } = require('hardhat')
const { deployContracts } = require('./helpers/deployment')

// some tests: https://github.com/RaphaelHardFork/ico-hardhat

const CONTRACT_NAME = 'Contract'

describe('Contract', function () {
  let contract, dev, owner

  const SUPPLY = ethers.utils.parseEther('100000')
  const ADDRESS_ZERO = ethers.constants.AddressZero

  beforeEach(async function () {
    ;[dev, owner] = await ethers.getSigners()
    const { _contract, _upgradeableContract } = await deployContracts(owner)
    contract = _contract
  })

  it('should deploy contract', async () => {
    expect(contract.address).to.not.equal(ADDRESS_ZERO)
  })
})
