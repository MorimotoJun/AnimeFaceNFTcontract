// require('dotenv').config();
import React, { useState } from 'react';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider';

const CHAIN_NAME = 'Mumbai';
const CHAIN_ID = '80001';
const HEX_CHAIN_ID = '0x13881';
const TOKEN = 'MATIC'
const RPC = 'https://rpc-mumbai.maticvigil.com';
const EXPLORER = 'https://polygonscan.com/';
const CONTRACT_ADDRESS = '0xC818b50a303B6AC94C850c1cDC179124ea9173B6';

function App() {
  async function enable () {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider && window.ethereum !== undefined ) {
      console.log('Welcome to MetaMask User🎉');
      await connectWallet();
    } else {
      console.log('Please Install MetaMask🙇‍♂️')
      return (
        <div className="App">
          <p>Please Install MetaMask🙇‍♂️</p>
        </div>
      );
    }
  }

  let empty: string[] = [];
  const [accounts,setAccounts] = useState(empty);
  const [chainId,setChainId] = useState(0);

	async function connectWallet ()  {
    /* =========== Connect Metamask ============= */

    // @ts-ignore
		await window.ethereum
      // @ts-ignore
      .request({ method: "eth_requestAccounts" })
      // @ts-ignore
      .then((result) => {
          setAccounts(result);
      });

    // @ts-ignore
    if (parseInt(window.ethereum.chainId, 16) !== CHAIN_ID) {  // If the network isn't Mumbai

      /* ============ Add MUMBAI network to Metamask ============ */

      // @ts-ignore
      await window.ethereum
      // @ts-ignore
      .request({
        "method": "wallet_addEthereumChain",
        "params": [
          {
            "chainId": HEX_CHAIN_ID,
            "chainName": CHAIN_NAME,
            "rpcUrls": [RPC],
            "nativeCurrency": {
              "name": TOKEN,
              "symbol": TOKEN,
              "decimals": 18
            },
            "blockExplorerUrls": [EXPLORER],
          }
        ]
      });


      /* ============ Switch network to MUMBAI ============ */

      // @ts-ignore
      await window.ethereum
      // @ts-ignore
      .request({
        "method": "wallet_switchEthereumChain",
        "params": [
          {
            "chainId": HEX_CHAIN_ID,
          }
        ]
      })
      .then(()=>{
        setChainId(Number(CHAIN_ID));
      });
    }
	}

  const [recipient, setRecipient] = useState("");
  const [hash, setHash] = useState("");
  
  function handleRecipient(event: any) {
    setRecipient(event.target.value);
  }

  function handleHash(event: any) {
    setHash(event.target.value);
  }

  async function submitMintTX() {
    // @ts-ignore
    await window.ethereum
    // @ts-ignore
    .request({
      "method": "eth_sendTransaction",
      "params": [
        {
          from: accounts[0],
          to: CONTRACT_ADDRESS,
          data: {
            "inputs": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
              }
            ],
            "name": "mintNFT",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          recipient,
          ipfsHash: hash,
        }
      ]
    })
    // @ts-ignore
    .then((txHash) => console.log(txHash))
    // @ts-ignore
    .catch((error) => console.error(error));;
  }

  return (
    <div className="App">
      <button onClick={enable}>Connect Wallet</button>
      <p>{ chainId }</p>
      <p>{ accounts[0] }</p>

      <form onSubmit={ submitMintTX }>
        <div>
          <label>
            Recipient:
            <input type="text" name="recipient" value={ recipient } onChange={ handleRecipient } />
          </label>
        </div>
        <div>
          <label>
            IPFS Hash:
            <input type="text" name="hash" value={ hash } onChange={ handleHash } />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;