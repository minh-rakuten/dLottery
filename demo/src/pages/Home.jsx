import React from 'react'
import MyComponent from '../components/MyComponent'
import ActiveLotteriesList from '../components/ActiveLotteriesList';
import CompletedLotteriesList from '../components/CompletedLotteriesList';
import LotteryDetails from '../pages/LotteryDetails';
import DLotteryNFTFunctions from '../components/DLotteryNFTFunctions';
import LotteryGeneratorFunctions from '../components/LotteryGeneratorFunctions';
import SpinnerFunctions from '../components/SpinnerFunctions';

function Home() {
  return (
    <div className='mainContainer'>
      <SpinnerFunctions />
      {/* <LotteryGeneratorFunctions /> */}
        {/* <DLotteryNFTFunctions /> */}
        <ActiveLotteriesList />
        <CompletedLotteriesList />
    </div>
  )
}

export default Home
