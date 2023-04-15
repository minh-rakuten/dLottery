// SPDX-License-Identifier: MIT

pragma solidity  ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./SpinnerLottery.sol";
import "./NFTLottery.sol";


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

    function createSpinnerLottery(
        LotteryType lotteryType,
        uint winningPercentage,
        uint deadLineInDays,
        bool looserGetNeft,
        uint maxDepositPerUserInCoins, // pass same min and max for fixed
        uint minDepositPerUserInCoins
    )
        public
    {
        SpinnerLottery lottery = new SpinnerLottery(
            msg.sender,
            address(this),
            winningPercentage,
            deadLineInDays,
            minDepositPerUserInCoins,
            maxDepositPerUserInCoins
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

    function createNFTLottery(
        LotteryType lotteryType,
        uint winningPercentage,
        uint deadLineInDays,
        bool looserGetNeft,
        uint maxDepositPerUserInCoins, // pass same min and max for fixed
        uint minDepositPerUserInCoins,
        IERC721 nftContract //Used for nft
    )
        public
    {
        if(lotteryType == LotteryType.NftLottery){

         NFTLottery lottery = new NFTLottery(
            msg.sender,
            maxDepositPerUserInCoins,
            nftContract,
            false, //this is for demo purpos to can demo without create nft contract
            winningPercentage,
            address(this)
            );


            lotteries[count] = Data({
                lotteryAddress: address(lottery),
                lotteryOwner: msg.sender,
                lotteryType : lotteryType,
                winningPercentage : winningPercentage, 
                deadLineInDays : deadLineInDays,
                looserGetNeft : looserGetNeft,
                maxDepositPerUserInCoins : maxDepositPerUserInCoins, //NFT uses fixed so both are same
                minDepositPerUserInCoins : minDepositPerUserInCoins //NFT uses fixed so both are same
            });
        }

        count++;
    }
}

