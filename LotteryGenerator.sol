pragma solidity  ^0.8.11;

import "./SpinnerLottery.sol";

contract ContractGenerator {


    address public owner;
    uint public lotteryGeneratorId;
    uint256 public count;



    enum LotteryType 
    { 
    SpinnerLottery, 
    NftLottery,
    LotteryMarket
    }

    
    constructor(){
       
       owner = msg.sender;
       lotteryGeneratorId = 1;
      
    }

    struct Data {
        address lotteryAddress;
        address lotteryOwner;
        LotteryType lotteryType;
        uint winningPercentage;
        uint deadLineInDays;
        bool looserGetNeft;
        uint maxDepositPerUserInCoins; //rawamount without decimals
        uint minDepositPerUserInCoins; //rawamount without decimals
    }

    mapping(uint256 => Data) public lotteries;

    function createLottery(
        LotteryType lotteryType,
        uint winningPercentage,
        uint deadLineInDays,
        bool looserGetNeft,
        uint maxDepositPerUserInCoins,
        uint minDepositPerUserInCoins
    )
        public
    {
        SpinnerLottery lottery = new SpinnerLottery(
            msg.sender,
            address(this)
        );

        lotteries[count] = Data({
            lotteryAddress: address(lottery),
            lotteryOwner: msg.sender,
            lotteryType : lotteryType,
            winningPercentage : winningPercentage, 
            deadLineInDays : deadLineInDays,
            looserGetNeft : looserGetNeft,
            maxDepositPerUserInCoins : maxDepositPerUserInCoins,
            minDepositPerUserInCoins : minDepositPerUserInCoins


        });

        count++;
    }
}

Footer
