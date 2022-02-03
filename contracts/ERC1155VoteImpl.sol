//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC1155Vote.sol";

contract ERC1155VoteImpl is ERC1155Vote {
    constructor(string memory uri_) ERC1155(uri_) {}
}
