// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILottery {
    function enterLottery() external payable;
    function pickWinner() external;
    function withdraw() external;
    function getPlayers() external view returns(address[] memory);
    function getParticipants(address) external view returns(bool);
    function getCondition(address) external view returns(bool);
    function getWinners() external view returns(address[] memory);
    function getLotteryNumber() external view returns(uint256);
    function getWinningPercentage() external view returns(uint256);
    
    event LotteryEnded(address[] winners, uint256 amount);
}