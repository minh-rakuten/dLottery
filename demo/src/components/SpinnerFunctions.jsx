import { useState } from 'react';
import { ethers } from 'ethers';
import dLotterySpinnerABI from '../abi/dLotterySpinnerABI.json';
import { Button } from '@mui/material';
import Confetti from 'react-dom-confetti';

const SpinnerGeneratorAddress = '0xa4752bd5312E526a4d18A27e62f83FBd153f50b3';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(SpinnerGeneratorAddress, dLotterySpinnerABI, signer);

function SpinnerFunctions() {
  const [confetti, setConfetti] = useState(false);
  const [winners, setWinners] = useState([]);

  const enterLottery = async () => {
    try {
      const tx = await contract.enterLottery({ value: ethers.utils.parseEther('0.01') });
      await tx.wait();
      console.log('Entered Lottery')
    } catch (error) {
      console.log(error);
    }
  };

  const pickWinner = async () => {
    try {
      const tx = await contract.pickWinner();
      await tx.wait();

      const lotteryNumber = await contract.getLotteryNumber();
      const lotteryWinners = await contract.getWinnerByLotteryId(lotteryNumber);
      console.log(lotteryNumber)
      console.log(`Winners are: ${lotteryWinners}`)

      setWinners(lotteryWinners);
      setConfetti(true);
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawFunds = async () => {
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      console.log("Withdrew funds!")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={enterLottery}>
        Enter Lottery
      </Button>
      <Button variant="contained" color="primary" onClick={pickWinner}>
        Pick Winner
      </Button>
      <Button variant="contained" color="primary" onClick={withdrawFunds}>
        Withdraw Funds
      </Button>
      {confetti && <Confetti />}
      <div>
        {winners.length > 0 &&
          winners.map((winner, index) => <div key={index}>{winner}</div>)}
      </div>
    </div>
  );
}

export default SpinnerFunctions;
