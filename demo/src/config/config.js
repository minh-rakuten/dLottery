import { Mainnet, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: 'https://mainnet.infura.io/v3/b17509e0e2ce45f48a44289ff1aa3c73',
        [Goerli.chainId]:  'https://goerli.infura.io/v3/b17509e0e2ce45f48a44289ff1aa3c73'
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