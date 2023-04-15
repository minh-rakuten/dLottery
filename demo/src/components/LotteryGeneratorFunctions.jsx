import { useState } from 'react';
import { ethers } from 'ethers';
import LotteryGeneratorABI from '../abi/LotteryGeneratorABI.json';
import { Button } from '@mui/material';
import Confetti from 'react-dom-confetti';
// Create the contract instance
const LotteryGeneratorAddress = '0x8464135c8F25Da09e49BC8782676a84730C318bC';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(dLotteryNFTAddress, LotteryGeneratorABI, signer);



function LotteryGeneratorFunctions() {
    const createSpinnerLottery = async () => {
        try {
          const tx = await contract.createLottery(
            0, // SpinnerLottery
            50, // 50% winning percentage
            7, // 7 days deadline
            false, // Loosers don't get NFT
            100, // Maximum deposit per user in coins
            10, // Minimum deposit per user in coins
            1000000000 // Ticket price in gwei (1 gwei = 0.000000001 ETH)
          );
          await tx.wait();
          setShowConfetti(true);
        } catch (error) {
          console.error('Error creating Spinner Lottery:', error);
        }
      };

  return (
    <div>LotteryGeneratorFunctions</div>
  )
}

export default LotteryGeneratorFunctions