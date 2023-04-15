import { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../abi/dLotteryABI.json';
import { Button } from '@mui/material';
import Confetti from 'react-dom-confetti';


// Create the contract instance
const dLotteryAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(dLotteryAddress, contractABI, signer);

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState('');
  const [players, setPlayers] = useState([]);
  const [confettiStatus, setConfettiStatus] = useState(false);
  const confettiConfig = {
    angle: 90,
    spread: "351",
    startVelocity: 40,
    elementCount: "200",
    dragFriction: "0.03",
    duration: "5940",
    stagger: 3,
    width: "15px",
    height: "44px",
    perspective: "679px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  }



  async function handleEnterClick() {
    setLoading(true);
    try {
      // Call the `enter` function
      const tx = await contract.enter({ value: ethers.utils.parseEther('0.1') });
      await tx.wait();
      console.log(tx.status())

      // Success feedback message
      console.log('Transaction confirmed!');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }




  async function handlePickWinnerClick() {
    setLoading(true);
    try {
      // Call the `pickWinner` function
      const tx = await contract.pickWinner();
      await tx.wait();

      // Get the latest winner address and update the state
      const lotteryId = await contract.lotteryId();
      console.log(`Lottery ID: ${lotteryId}`);
      const latestWinner = await contract.getWinnerByLotteryId(lotteryId - 1);
      console.log('Latest winner:', latestWinner);
      setWinner(latestWinner);
      const connectedAddress = await signer.getAddress();
      if (latestWinner === connectedAddress) {
        console.log('You won!');
        setConfettiStatus(true)
      } else {
        console.log('You lose');
      }
      // Clear the list of players from the UI
      setPlayers([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }




  async function handleGetPlayersClick() {
    setLoading(true);
    try {
      // Call the `getPlayers` function
      const players = await contract.getPlayers();
      setPlayers(players);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <div>
      <Button variant='contained' sx={{ margin: '5px', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000', }, '&:active': { backgroundColor: '#ff8f00', } }} onClick={handleEnterClick} disabled={loading}>Enter Lottery</Button>
      <Button variant='contained' color='success' sx={{ margin: '5px', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000', }, '&:active': { backgroundColor: '#ff8f00', } }} onClick={handleGetPlayersClick} disabled={loading}>Get Players</Button>{
        signer && <Button variant='contained' color='success' sx={{ margin: '5px', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000', }, '&:active': { backgroundColor: '#ff8f00', }}} onClick={handlePickWinnerClick} disabled={loading}>Pick Winner</Button>
      }
      
      {loading && <p>Loading...</p>}
      {winner && <Confetti active={confettiStatus} config={confettiConfig} />}
      {players.length > 0 && (
        <div>
          <h2>Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                {player}
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
}

export default MyComponent;
