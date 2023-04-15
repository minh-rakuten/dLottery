// import { useState } from 'react';
// import { ethers } from 'ethers';
// import LotteryGeneratorABI from '../abi/LotteryGeneratorABI.json';
// import { Button } from '@mui/material';
// import Confetti from 'react-dom-confetti';
// // Create the contract instance
// const LotteryGeneratorAddress = '0x8464135c8F25Da09e49BC8782676a84730C318bC';
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();
// const contract = new ethers.Contract(dLotteryNFTAddress, LotteryGeneratorABI, signer);



// function LotteryGeneratorFunctions() {
//     const createSpinnerLottery = async () => {
//         try {
//           const tx = await contract.createLottery(
//             0, // SpinnerLottery
//             50, // 50% winning percentage
//             7, // 7 days deadline
//             false, // Loosers don't get NFT
//             100, // Maximum deposit per user in coins
//             10, // Minimum deposit per user in coins
//             1000000000 // Ticket price in gwei (1 gwei = 0.000000001 ETH)
//           );
//           await tx.wait();
//           setShowConfetti(true);
//         } catch (error) {
//           console.error('Error creating Spinner Lottery:', error);
//         }
//       };

//       const createNFTLottery = async () => {
//         try {
//           // Replace "nftContract" with an actual IERC721 instance
//           const tx = await contract.createLottery(
//             1, // NftLottery
//             50, // 50% winning percentage
//             7, // 7 days deadline
//             false, // Loosers don't get NFT
//             0, // NFT lotteries don't have maximum deposit per user
//             0, // NFT lotteries don't have minimum deposit per user
//             0, // NFT lotteries don't have ticket price
//             nftContract
//           );
//           await tx.wait();
//           setShowConfetti(true);
//         } catch (error) {
//           console.error('Error creating NFT Lottery:', error);
//         }
//       };

//   return (
//     <div>
//       <Button onClick={createSpinnerLottery}>Create Spinner Lottery</Button>
//       <Button onClick={createNFTLottery}>Create NFT Lottery</Button>
//       <Confetti active={showConfetti} />
//     </div>  
//     )
// }

// export default LotteryGeneratorFunctions