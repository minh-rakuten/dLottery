// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILottery {
    function buyTicket() external payable;
    function endLottery() external;
    function withdraw() external;
    function players() external view returns(address[] memory);
    function participants(address) external view returns(bool);
    function condition(address) external view returns(bool);
    function winners() external view returns(address[] memory);
    function lotteryNumber() external view returns(uint256);
    function winningPercentage() external view returns(uint256);
    
    event LotteryEnded(address[] winners, uint256 amount);
}