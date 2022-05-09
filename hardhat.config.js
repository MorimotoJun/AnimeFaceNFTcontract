require('dotenv').config();
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

let NETWORK = "hardhat";
let is_network = false;
for (const a of process.argv) {
  if (a == "--network") {
    is_network = true;
    continue;
  }
  if (is_network == true) {
    NETWORK = a;
    is_network = false;
    continue;
  }
}

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/{ INFURA_PROJECT_ID }",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: JSON.parse(process.env.ETHERSCAN_API_KEYS)[NETWORK]
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}