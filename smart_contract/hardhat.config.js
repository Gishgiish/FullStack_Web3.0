//require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/MpmxPT7qNaXgNpqJCM-fjmAAu168McMN", //url for the network in use, could be sepolia or goerli
      accounts: [
        "6d9b03400e0aaab33409db33dba7542a65821ecfb98823bf6c0845c1cdf84e49",
      ], //paste private key of the wallet;,
    },
  },
};
