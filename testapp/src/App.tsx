
import React from 'react';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

function App() {

  const [address, setAddress] = React.useState("");

  var web3: Web3;
  
  const enable = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider && window.ethereum?.isMetaMask) {
      console.log('Welcome to MetaMask User🎉');
      
      const provider = new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com/");
      web3 = new Web3(provider);
      
      const accounts = await web3.eth.requestAccounts();
      setAddress(accounts[0]);
    } else {
      console.log('Please Install MetaMask🙇‍♂️')
    }
  }

  enable();

  return (
    <div className="App">
      {address}
    </div>
  );
}

export default App;