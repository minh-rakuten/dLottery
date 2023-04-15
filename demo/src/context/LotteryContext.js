import React, { createContext, useContext, useState } from 'react'

const LotteryContext = createContext()

export const useLottery = () => {
    return useContext(LotteryContext)
}

export const LotteryProvider = ({ children }) => {
    const [winningPercentage, setWinningPercentage] = useState(30)
    const [multichain, setMultichain] = useState(false)
    const [chain, setChain] = useState(['Ethereum'])
    const [ethAmountPerPlayer, setEthAmountPerPlayer] = useState(0)
    const [maxPlayers, setMaxPlayers] = useState(0)
    const [duration, setDuration] = useState(0)
    const [loserNft, setLoserNft] = useState(false)

    const handleSliderChange = (event, newValue) => {
        setWinningPercentage(newValue)
    }

    const handleMultichainChange = (event) => {
        setMultichain(event.target.checked)
    }

    const handleChainChange = (event) => {
        setChain(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const value = {
        winningPercentage,
        setWinningPercentage,
        multichain,
        setMultichain,
        chain,
        setChain,
        ethAmountPerPlayer,
        setEthAmountPerPlayer,
        maxPlayers,
        setMaxPlayers,
        duration,
        setDuration,
        loserNft,
        setLoserNft,
        handleSubmit,
    }

    return (
        <LotteryContext.Provider value={value}>
            {children}
        </LotteryContext.Provider>
    )
}
