pragma solidity  ^0.8.11;

import "./interface/ILottery.sol";

contract SpinnerLottery is ILottery {

    address public owner;
    address[] public players;
    address[] public mWinners;
    address mParentAddress;
    uint mDeadLineInDays;
    uint mDeployedTime;

    uint mMinDeposit; //Ether
    uint mMaxDeposit; //Ether

    uint public lotteryId;
    address public generatorAddress; //Parent contract adress for backward compability
    uint private mWinningPercentage;
    mapping (uint => address[]) lotteryHistory; //Can have list of winners per lottery id
    bool public ended;
    uint256 internal prize = 0;


    constructor(
        address _owner,
        address parentAddress,
        uint256 winningPercentage,
        uint deadLineInDays,
        uint minDeposit,
        uint maxDeposit
    ){
        owner = _owner;
        lotteryId = 1;
        mWinningPercentage = winningPercentage;
        mParentAddress = parentAddress;
        mDeadLineInDays = deadLineInDays;
        mDeployedTime = block.timestamp;
        mMinDeposit = minDeposit;
        mMaxDeposit = maxDeposit;
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

    function enterLottery() external payable enterLotteryRequirement override { //payable cause lead to some payment in blockchain
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

        prize = (balance - (balance /100)) / numWinners ;

        lotteryHistory[lotteryId] = mWinners;
        lotteryId++;

        //reset the state
        players = new address payable[](0);
        ended = true;

        emit LotteryEnded(mWinners, prize);
    }

    function checkAddressAlreadyExsits(address checkedAddress) private view returns (bool) {

        for (uint i = 0; i < players.length; i++) {
                if (players[i] == checkedAddress) {
                return true;
            }
        }
        return false;
    }

    modifier onlyOwner(){
        require(msg.sender == owner); 
        _;
    }

    modifier onlyWinner(){
        require(addressIsInWinnerList() == true , "You not in this lottery winners list!");
        require(prize != 0 , "Lottery has not finished yet!");
        _;
    }

    function addressIsInWinnerList() private view returns (bool) {

        for (uint i = 0; i < mWinners.length; i++) {
                if (mWinners[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function getCondition(address participant) external view override returns(bool) {
        return checkAddressAlreadyExsits(participant);
    }

    modifier enterLotteryRequirement(){
        require(msg.value >= (mMinDeposit * (1 ether)) && msg.value <= (mMaxDeposit * (1 ether)), "out of deposit min max range");
        require(checkAddressAlreadyExsits(msg.sender) == false);
        require(lotteryNotPassedDeadline() == true);
        _;
    }

    function lotteryNotPassedDeadline() 
    private 
    view 
    returns (bool) {

    uint now = block.timestamp;
    uint daysDiff = (now - mDeployedTime) / 60 / 60 / 24 ; 
    if (daysDiff <= mDeadLineInDays){
        return true;
    }
    return false;

    }

    function randomIndices(uint256 numWinners, uint256 ticketCount) private view returns (uint256[] memory) {
        uint256[] memory indices = new uint256[](ticketCount);
        for (uint256 i = 0; i < ticketCount; i++) {
            indices[i] = i;
        }

        for (uint256 i = 0; i < numWinners; i++) {
            uint256 j = i + uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, i))) % (ticketCount - i);
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

    function claimPrize() external override onlyWinner {
            payable(msg.sender).transfer(prize);
    }
}