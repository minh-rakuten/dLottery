import React from 'react'
import MyComponent from '../components/MyComponent'
import ActiveLotteriesList from '../components/ActiveLotteriesList';
import CompletedLotteriesList from '../components/CompletedLotteriesList';
import LotteryDetails from '../pages/LotteryDetails';
import DLotteryNFTFunctions from '../components/DLotteryNFTFunctions';

function Home() {
  return (
    <div className='mainContainer'>
        <DLotteryNFTFunctions />
        <ActiveLotteriesList />
        <CompletedLotteriesList />
    </div>
  )
}

export default Home
