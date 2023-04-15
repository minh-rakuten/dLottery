pragma solidity  ^0.8.11;

import "./interface/ILottery.sol";

contract SpinnerLottery is ILottery {

    address public owner;
    address[] public players;
    address[] public mWinners;
    address mParentAddress;

    uint public lotteryId;
    address public generatorAddress; //Parent contract adress for backward compability
    uint private mWinningPercentage;
    mapping (uint => address[]) lotteryHistory; //Can have list of winners per lottery id
    bool public ended;

    constructor(
        address _owner,
        address parentAddress,
        uint256 winningPercentage
    ){
        owner = _owner;
        lotteryId = 1;
        mWinningPercentage = winningPercentage;
        mParentAddress = parentAddress;
    }

    function getBalance() 
        public 
        view 
        returns (uint) 
    {
        return address(this).balance;
    }

    function getPlayers() public view returns (address[] memory){ //out put is tempurary only for function call
        return players;
    }

    function getParticipants(address checkedAddr) external view returns(bool) {
        return checkAddressAlreadyExsits(checkedAddr);
    }

    function enterLottery() external payable minimumToEnter override { //payable cause lead to some payment in blockchain
        // require(msg.value > .01 ether);

       //Player address
        players.push(payable(msg.sender));
    }

    function getWinnerByLotteryId(uint index) public view returns (address[] memory){

        return lotteryHistory[index];
    }

    function getRandomNumber() public view returns (uint){ //view because change nothing in blockchain
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() external onlyOwner {

        uint256 numWinners = (players.length * mWinningPercentage) / 100;
        uint256[] memory indices = randomIndices(numWinners, players.length);

        for (uint256 i = 0; i < numWinners; i++) {
            mWinners.push(players[indices[i]]);
        }

        uint256 balance = address(this).balance;

        uint256 prize = (balance - (balance /100) )/ numWinners; //0.01 fee for owner 
        for (uint256 i = 0; i < numWinners; i++) {
            payable(mWinners[i]).transfer(prize);
        }

        lotteryHistory[lotteryId] = mWinners;
        lotteryId++;

        //reset the state
        players = new address payable[](0);
        ended = true;
    }

    function checkAddressAlreadyExsits(address checkedAddress) private view returns (bool) {

        for (uint i = 0; i < players.length; i++) {
                if (players[i] == checkedAddress) {
                return true;
            }
        }
        return false;
    }

    function withdraw() external override onlyOwner {
        require(ended, "Lottery has not ended yet");

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        payable(owner).transfer(balance);
    }

    modifier onlyOwner(){
        require(msg.sender == owner); 
        _;
    }

    function getCondition(address participant) external view override returns(bool) {
        return checkAddressAlreadyExsits(participant);
    }

    modifier minimumToEnter(){
        require(msg.value > .0001 ether);
        require(checkAddressAlreadyExsits(msg.sender) == false);
        _;
       
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

    function getWinners() external view override returns(address[] memory) {
        require(ended, "Lottery has not ended yet");

        return mWinners;
    }
    
    function getLotteryNumber() external view override returns(uint256) {
        require(ended, "Lottery has not ended yet");

        return lotteryId;
    }

    function getWinningPercentage() external view override returns(uint256) {
        return mWinningPercentage;
    }
}