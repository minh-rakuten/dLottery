// SPDX-License-Identifier: MIT


pragma solidity  ^0.8.11;

contract dLottery {

    address public owner;
    address payable [] public players;
    uint public lotteryId;
    string lotteryTitlePrefix = "Lottery No:";
    mapping (string => address payable) public lotteryHistory;

    constructor(){
        owner = msg.sender;
        lotteryId = 1;
    }


    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory){ //out put is tempurary only for function call
        return players;
    }

    function enter() public payable minimumToEnter { //payable cause lead to some payment in blockchain

       //Player address
        players.push(payable(msg.sender));
    }

    function getWinnerByLotteryId(uint index) public view returns (address payable){

        //  string memory lotteryKey = string(abi.encodePacked(lotteryTitlePrefix , uintToString(index)));
         string memory lotteryKey = string.concat(lotteryTitlePrefix , Strings.toString(index));


        return lotteryHistory[lotteryKey];
    }

    function getLotteryName() public view returns (string memory){

        string memory lotteryKey = string(abi.encodePacked(lotteryTitlePrefix ,uintToString(lotteryId)));

        return string (lotteryKey);
    }

    function getRandomNumber() public view returns (uint){ //view because change nothing in blockchain
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner {

        uint index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance);

         string memory lotteryKey = string(abi.encodePacked(lotteryTitlePrefix , lotteryId));

        lotteryHistory[lotteryKey] = players[index];
        lotteryId++;

        //reset the state
        players = new address payable[](0);

    }

   

    //Internal private functions

     function checkAddressAlreadyExsits() private view returns (bool) {

        for (uint i = 0; i < players.length; i++) {
                if (players[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function uintToString(uint v) private returns (string memory str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes(8 + remainder);
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        str = string(s);
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
}