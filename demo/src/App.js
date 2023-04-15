import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEthers, useEtherBalance } from '@usedapp/core';
import config from './config/config';
import { LotteryProvider } from './context/LotteryContext';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import CreateLottery from './pages/CreateLottery'
import CreatePredictionForm from './components/CreatePredictionForm'
import Leaderboard from './pages/Leaderboard'
import CreateNFTLottery from './components/CreateNFTLottery'
import LotteryDetails from './pages/LotteryDetails';

function App() {
  const { chainId, account } = useEthers();

  const etherBalance = useEtherBalance(account);

  if (chainId && !config.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>;
  }

  return (
    <LotteryProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/create-lottery' element={<CreateLottery />} />
          <Route path='/create-nft-lottery' element={<CreateNFTLottery />} />
          <Route path='/create-prediction' element={<CreatePredictionForm />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/lottery-details' element={<LotteryDetails />} />
        </Routes>
        {/* <div>
          {etherBalance && (
            <div className="balance">
              <br />
              Your Connected Address:
              <p className="bold">{account}</p>
              <br />
              Balance:
              <p className="bold">{formatEther(etherBalance)}</p>
            </div>
          )}
          <MyComponent />
        </div> */}
      </BrowserRouter>
    </LotteryProvider>

  );
}

export default App;
