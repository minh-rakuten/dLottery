// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ILottery.sol";

interface INFTLottery is ILottery {
    function nftContract() external view returns(IERC721);
}
