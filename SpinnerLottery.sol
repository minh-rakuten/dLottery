pragma solidity  ^0.8.11;

contract SpinnerLottery{

    address public owner;
    address payable [] public players;
    address payable [] public mWinners;
    address mParentAddress;

    uint public lotteryId;
    address public generatorAddress; //Parent contract adress for backward compability
    uint private mWinningPercentage;
    mapping (uint => address payable[]) lotteryHistory; //Can have list of winners per lottery id


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

    function getPlayers() public view returns (address payable[] memory){ //out put is tempurary only for function call
        return players;
    }

    function enter() public payable minimumToEnter { //payable cause lead to some payment in blockchain
        // require(msg.value > .01 ether);

       //Player address
        players.push(payable(msg.sender));
    }

    function getWinnerByLotteryId(uint index) public view returns (address payable[] memory){

        return lotteryHistory[index];
    }

    function getRandomNumber() public view returns (uint){ //view because change nothing in blockchain
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner {

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
    }

    function checkAddressAlreadyExsits() private view returns (bool) {

        for (uint i = 0; i < players.length; i++) {
                if (players[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    modifier onlyOwner(){
        require(msg.sender == owner); 
        _;
    }


    modifier minimumToEnter(){
        require(msg.value > .0001 ether);
        require(checkAddressAlreadyExsits() == false);
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
}