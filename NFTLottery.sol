// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./interface/INFTLottery.sol";

contract NFTLottery is INFTLottery {
    address public owner;
    address[] internal mWinners;
    uint256 public ticketPrice;
    uint256 internal mLotteryNumber;
    uint256 internal mWinningPercentage;
    address mParentAddress;
    bool public ended;
    address[] public mPlayers;
    mapping(address => bool) internal mParticipants;

    IERC721 private _nftContract;
    bool private _nftRequired;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(
    address lotteryOwner, 
    uint256 _ticketPrice, 
    IERC721 nftContract, 
    bool nftRequired, 
    uint256 winningPercentage,
    address parentAddress
    ) {
        require(winningPercentage > 0 && winningPercentage <= 100, "Winning percentage must be between 1 and 100");
        owner = lotteryOwner;
        ticketPrice = _ticketPrice;
        _nftContract = nftContract;
        _nftRequired = nftRequired;
        mWinningPercentage = winningPercentage;
        mParentAddress = parentAddress;
    }

    function enterLottery() external payable override {
        require(!ended, "Lottery has already ended");
        require(msg.value == ticketPrice, "Incorrect ticket price");
        require(!mParticipants[msg.sender], "You have already purchased a ticket");

        if (_nftRequired) {
            require(_nftContract.balanceOf(msg.sender) > 0, "You must own an NFT from the designated collection to participate");
        }

        mParticipants[msg.sender] = true;
        mPlayers.push(msg.sender);
    }

    function pickWinner() external override onlyOwner {
        require(!ended, "Lottery has already ended");

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to distribute as prize");

        ended = true;
        mLotteryNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, mPlayers.length)));
        uint256 numWinners = (mPlayers.length * mWinningPercentage) / 100;
        uint256[] memory indices = randomIndices(numWinners, mPlayers.length);

        for (uint256 i = 0; i < numWinners; i++) {
            mWinners.push(mPlayers[indices[i]]);
        }

        uint256 prize = balance / numWinners;
        for (uint256 i = 0; i < numWinners; i++) {
            payable(mWinners[i]).transfer(prize);
        }
        emit LotteryEnded(mWinners, prize);
    }

    function withdraw() external override onlyOwner {
        require(ended, "Lottery has not ended yet");

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        payable(owner).transfer(balance);
    }

    function getPlayers() external view returns(address[] memory) {
        return mPlayers;
    }

    function getCondition(address participant) external view override returns(bool) {
        if (_nftRequired) {
            return _nftContract.balanceOf(participant) > 0;
        } else {
            // Add any other condition here
            return true;
        }
    }

    function getWinners() external view override returns(address[] memory) {
        require(ended, "Lottery has not ended yet");

        return mWinners;
    }

    function getLotteryNumber() external view override returns(uint256) {
        require(ended, "Lottery has not ended yet");

        return mLotteryNumber;
    }



    function nftContract() external view override returns(IERC721) {
        return _nftContract;
    }

    function getParticipants(address participant) external view override returns(bool) {
        return mParticipants[participant];
    }

    function randomIndices(uint256 numWinners, uint256 ticketCount) private view returns (uint256[] memory) {
        uint256[] memory indices = new uint256[](ticketCount);
        for (uint256 i = 0; i < ticketCount; i++) {
            indices[i] = i;
        }

        for (uint256 i = 0; i < numWinners; i++) {
            uint256 j = i + uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, i))) % (ticketCount - i);
            (indices[i], indices[j]) = (indices[j], indices[i]);
        }

        return indices;
    }

    function getWinningPercentage() external view override returns(uint){
        return mWinningPercentage;
    }
}
