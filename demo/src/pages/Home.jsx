import React from 'react'
import MyComponent from '../components/MyComponent'
import ActiveLotteriesList from '../components/ActiveLotteriesList';
import CompletedLotteriesList from '../components/CompletedLotteriesList';
import LotteryDetails from '../pages/LotteryDetails';

function Home() {
  return (
    <div className='mainContainer'>
        {/* <MyComponent /> */}
        <ActiveLotteriesList />
        <CompletedLotteriesList />
    </div>
  )
}

export default Home
