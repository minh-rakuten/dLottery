import React from 'react'
import { useEthers, shortenAddress } from '@usedapp/core'
import { Button } from '@mui/material'

const ConnectButton = () => {
    const { account, deactivate, activateBrowserWallet } = useEthers()
    // 'account' being undefined means that we are not connected.
    if (account) return <Button variant="outlined" style={{ color: '#ffb400', borderColor: '#ffb400' }} onClick={() => deactivate()}><strong>{shortenAddress(account)}</strong></Button>
    else return <Button variant="contained" sx={{ backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000', }, '&:active': { backgroundColor: '#ff8f00', } }} onClick={() => activateBrowserWallet()}><strong>Connect Wallet</strong></Button>
  }
  

export default ConnectButton