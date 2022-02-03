# HardHat Project Template

## Dependency installed:

- openzeppelin (with upgradable contracts and pluggins)
- docgen
- dotenv
- prettier & eslint
- hardhat-gas-reporter
- hardhat-contract-sizer
- metamask/eth-sig-util

## Config for networks

- BSC (mainnet & testnet)
- Polygon (mainnet & testnet)

## File template:

- Contract.sol (Exemple of ERC20)
- Contract-test.js (tests syntax initiated)
- Deployment Scripts
- Post deployment scripts
- UpgradeableContract.sol (Exemple of ERC20Upgradeable, using UUPS)
- Deploy & Upgrade script using Upgrades-Pluggin from OpenZeppelin

## To do:

Create a `.env` with:

- PRIVATE_KEY
- INFURA_PROJECT_ID
- ETHERSCAN_KEY

## Node 17 error

Run this command in case of this error:

```
error:03000086:digital envelope routines::initialization error
```

In the terminal:

```
export NODE_OPTIONS=--openssl-legacy-provider

```
