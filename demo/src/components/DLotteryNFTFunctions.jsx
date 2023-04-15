import { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../abi/dLotteryNFTABI.json';
import { Button } from '@mui/material';
import Confetti from 'react-dom-confetti';


// Create the contract instance
const dLotteryNFTAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(dLotteryNFTAddress, contractABI, signer);

function DLotteryNFTFunctions() {
    const [ticketPrice, setTicketPrice] = useState(0);
    const [ended, setEnded] = useState(false);
    const [players, setPlayers] = useState([]);
    const [winners, setWinners] = useState([]);
    const [lotteryNumber, setLotteryNumber] = useState(0);


  // Function to get the ticket price
    // Function to get the ticket price
    const getTicketPrice = async () => {
        try {
          const price = await contract.ticketPrice();
          console.log(price)
          setTicketPrice(price.toString());
        } catch (error) {
          console.error('Error getting ticket price:', error);
        }
      };
    
      // Function to buy a ticket
      const buyTicket = async () => {
        try {
          await contract.buyTicket({ value: ticketPrice });
          console.log('Ticket purchased');
        } catch (error) {
          console.error('Error buying ticket:', error);
        }
      };
    
      // Function to end the lottery
      const endLottery = async () => {
        try {
          await contract.endLottery();
          setEnded(true);
          console.log('Lottery ended');
        } catch (error) {
          console.error('Error ending lottery:', error);
        }
      };
    
      // Function to get the players
      const getPlayers = async () => {
        try {
          const playerList = await contract.players();
          setPlayers(playerList);
          const price = await contract.ticketPrice();
          console.log(price.toString())

          console.log(playerList)
        } catch (error) {
          console.error('Error getting players:', error);
        }
      };
    
      // Function to get the winners
      const getWinners = async () => {
        try {
          const winnerList = await contract.winners();
          setWinners(winnerList);
          console.log(winnerList)
        } catch (error) {
          console.error('Error getting winners:', error);
        }
      };
    
      // Function to get the lottery number
      const getLotteryNumber = async () => {
        try {
          const number = await contract.lotteryNumber();
          setLotteryNumber(number.toNumber());
          console.log(lotteryNumber)
        } catch (error) {
          console.error('Error getting lottery number:', error);
        }
      };

  return (
    <>
        <Button variant="contained" onClick={getTicketPrice}>
        Get Ticket Price
      </Button>
      <Button variant="contained" onClick={buyTicket}>
        Buy Ticket
      </Button>
      <Button variant="contained" onClick={endLottery}>
        End Lottery
      </Button>
      <Button variant="contained" onClick={getPlayers}>
        Get Players
      </Button>
      <Button variant="contained" onClick={getWinners}>
        Get Winners
      </Button>
      <Button variant="contained" onClick={getLotteryNumber}>
        Get Lottery Number
      </Button>
      <Confetti active={ended} />
    </>
  )
}

export default DLotteryNFTFunctions