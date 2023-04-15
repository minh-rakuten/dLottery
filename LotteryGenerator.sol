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

    function createLottery(
        LotteryType lotteryType,
        uint winningPercentage,
        uint deadLineInDays,
        bool looserGetNeft,
        uint maxDepositPerUserInCoins,
        uint minDepositPerUserInCoins,
        uint256 _ticketPrice, // Used for fixed
        IERC721 nftContract //Used for nft

    )
        public
    {

        if(lotteryType == LotteryType.SpinnerLottery){

        SpinnerLottery lottery = new SpinnerLottery(
            msg.sender,
            address(this),
            winningPercentage
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

        }
        if(lotteryType == LotteryType.NftLottery){

         NFTLottery lottery = new NFTLottery(
            msg.sender,
            _ticketPrice,
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
            maxDepositPerUserInCoins : 0, //NFT does not have this values
            minDepositPerUserInCoins : 0 //NFT does not have this values

               });
        }

      


        count++;
    }
}

