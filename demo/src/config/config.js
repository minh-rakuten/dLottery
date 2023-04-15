import { Mainnet, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: getDefaultProvider('mainnet'),
        [Goerli.chainId]: getDefaultProvider('goerli'),
    },
};
export default config;

// import { Localhost } from '@usedapp/core'

// const config = {
//   readOnlyChainId: Localhost.chainId,
//   readOnlyUrls: {
//     [Localhost.chainId]: 'http://127.0.0.1:5675',
//   },
// }

// export default config;