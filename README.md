# AnimeFaceNFT

## Goal
This repository is created to test NFT contracts and test Opensea's UX

## Expected Use Case
* Metadata    : Stored in IPFS
* Minter      : Only the owner of this contract
* MarketPlace : Opensea

## Contracts
* Based on ERC721 contract code from Openzeppelin
* Overwrite _baseURI() to make it easier to access IPFS (we should register only IPFS hash when mint NFTs)
* Overwrite isApprovedForAll() to enable Opensea to Transfer NFTs in this contract
* Only the owner of this contract can mint NFTs
* The owner can list URIs of all NFTs from this contract

## Setup
```
$ npm install
$ npx hardhat
```
1. apply to [Polygonscan API](https://polygonscan.com/register) and [Etherscan API](https://etherscan.io/apis)
2. install [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja)
3. fill token to your wallet from [faucet](https://mumbaifaucet.com/) or CEX
4. register to [Infura](https://infura.io/) and "create project" to get "project id" => fill { INFURA_PROJECT_ID } at ./hardhat.config.js
5. run above codes
6. create `.env` file as below
```
PRIVATE_KEY={ SECRET_KEY_OF_YOUR_METAMASK_WALLET }
ETHERSCAN_API_KEYS={"hardhat":"", "mumbai":"{ POLYGONSCAN_API_KEY }", "rinkeby": "{ ETHERSCAN_API_KEY }"}
```

## Customize
Line 13 of `./contracts/AnimeFaceNFT.sol` file is the name of the NFT collection that your contract issues. Please rewrite "AnimeFaceNFT" or "AFN" as you like.

## Test
`npx hardhat test`

## Deploy
```
$ npx hardhat run --network { Network Name } scripts/deploy_animefacenft.js
$ npx hardhat verify --network { Network Name } { Contract Address }
```

## Set image and metadata files on IPFS storage using [Pinata](https://www.pinata.cloud/)
1. [Register](https://app.pinata.cloud/register)
2. [Get API Key](https://app.pinata.cloud/keys) if you'd like to use it
3. Upload image file and pin it on Pinata → Get "hash"
4. Create Metadata JSON file as below using "hash" from 3rd operation
```JSON
{
  "description": "{ Description of this NFT }", 
  "external_url": "{ URL of your service site }", 
  "image": "https://gateway.pinata.cloud/ipfs/{ IPFS HASH }", 
  "name": "{ Name of this NFT }",
  "attributes": [ ... ], 
}
```
5. Upload JSON from "4" and get its hash for metadata

## Setup the React client app
```
$ cd mintApp
$ npm install
```
* open `mintApp/src/chain.json` and fill the informations
```chain.json
{
    "CHAIN_NAME": "{ CHAIN_NAME }",             // as you like
    "CHAIN_ID": "{ CHAIN_ID }",                 // decimal integer (mumbai: 5, rinkeby: 4)
    "HEX_CHAIN_ID": "{ HEX_CHAIN_ID }",         // hex integer (mumbai: 0x5, rinkeby: 0x4)
    "TOKEN": "{ TOKEN_SYMBOL }",                // token name (mumbai: MATIC, rinkeby: ETH)
    "RPC": "{ RPC_ENDPOINT }",                  // RPC Endpoint
    "EXPLORER": "{ EXPLORER_URL }",             // explorer address
    "CONTRACT_ADDRESS": "{ CONTRACT_ADDRESS }"  // contract address
}
```

## Start React App And Mint NFTs
1. `npm start` to start app
2. After starting the application, click "Connect Wallet" at first.
3. Second, fill "Recipient" field the address of wallet you wanna send NFT to.
4. Third, fill "IPFS Hash" field the "hash" of Metadata JSON
5. Finally, click "MINT Anime Face NFT" button and sign & submit TX by Metamask

## Integrate to [Testnet Opensea](https://testnets.opensea.io/)
1. Access [Link](https://opensea.io/get-listed) and click "Live on a testnet"
2. Select "Mumbai" or "Rinkeby" as network
3. Fill the contract address and click "Submit"
4. You'll be redirected to your new collection page. Let's check NFT you've just minted!!
