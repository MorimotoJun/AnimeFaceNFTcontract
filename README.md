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
$ touch .env
```
* apply to [Polygonscan API](https://polygonscan.com/register)
* run above codes
* edit `.env` file as below
```
PRIVATE_KEY={ Secret Key of Your Wallet on Mumbai network }
POLYGONSCAN_API_KEY={ API Key of Your Polygonscan }
```

## Test
`npx hardhat test`

## Deploy
`npx hardhat run --network mumbai scripts/deploy_animefacenft.js`