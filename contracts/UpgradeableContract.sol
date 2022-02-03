//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

// contracts: https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts
// docs: https://docs.openzeppelin.com/contracts/4.x/

contract UpgradeableContract is Initializable, UUPSUpgradeable, ERC20Upgradeable {
    // solhint-disable-next-line
    function __UpgradeableContract_init(string memory name_, string memory symbol_) external initializer {
        __Context_init_unchained();
        __ERC20_init_unchained(name_, symbol_);
    }

    function _authorizeUpgrade(address) internal pure override {
        require(true, "UC: wrong upgrader");
    }
}
