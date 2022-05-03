// require('dotenv').config();
import { useState } from 'react';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider';
//@ts-ignore
import { encodeMintABI } from './data_encoder/mintNFT.ts';
import info from "./chain.json"

const CHAIN_NAME = info.CHAIN_NAME;
const CHAIN_ID = info.CHAIN_ID;
const HEX_CHAIN_ID = info.HEX_CHAIN_ID;
const TOKEN = info.TOKEN;
const RPC = info.RPC;
const EXPLORER = info.EXPLORER;
const CONTRACT_ADDRESS = info.CONTRACT_ADDRESS;

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

  /* ============== Mint Function ================= */
  const [recipient, setRecipient] = useState("");
  const [hash, setHash] = useState("");
  
  function handleRecipient(event: any) {
    setRecipient(event.target.value);
  }

  function handleHash(event: any) {
    setHash(event.target.value);
  }

  async function submitMintTX() {
    const data = encodeMintABI(recipient, hash);
    // @ts-ignore
    await window.ethereum
    // @ts-ignore
    .request({
      "method": "eth_sendTransaction",
      "params": [
        {
          from: accounts[0],
          to: CONTRACT_ADDRESS,
          data
        }
      ]
    })
    // @ts-ignore
    .then((txHash) => console.log(txHash))
    // @ts-ignore
    .catch((error) => console.error(error));;
  }
  /* ============================================== */

  return (
    <div className="App">
      <button onClick={enable}>Connect Wallet</button>
      <p>{ chainId }</p>
      <p>{ accounts[0] }</p>

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
      <button onClick={ submitMintTX }>MINT Anime Face NFT</button>
    </div>
  );
}

export default App;