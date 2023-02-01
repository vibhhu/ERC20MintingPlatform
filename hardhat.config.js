// We need to import these extensions in order for hardhat to function properly
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

// We need hardhat-etherscan to upload(verify) aur smart contractto etherscan.
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_RPC_URL,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
  },

  // We don't need following ethescan block for deployment, but we need it for smart contract verification (upload).
  etherscan: {
    apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
  },
};