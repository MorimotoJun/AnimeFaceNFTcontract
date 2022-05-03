'use strict';
import Web3 from 'web3';


/* ========== Input Your Information ============= */
const RECIPIENT = "0x7e45EA871D9d0ab32A29F477Bc69924E7E0Fa19a";
const HASH = "QmaBeQuAnuZApZNPYUUBS4LRp7LAnt18WRkDM7VpGGT1qG";
// const RECIPIENT = "{ Real Address }";
// const HASH = "{ Real IPFS Hash }";
/* =============================================== */

const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com');
const web3 = new Web3(provider);
const abi = {
    inputs: [
        {
            internalType: "address",
            name: "recipient",
            type: "address"
        },
        {
            internalType: "string",
            name: "ipfsHash",
            type: "string"
        }
    ],
    name: "mintNFT",
    type: "function"
};

const encodedFuncCall = web3.eth.abi.encodeFunctionCall(abi, [RECIPIENT, HASH]);
console.log(encodedFuncCall);

const encodedRecipient = web3.eth.abi.encodeParameter("address", RECIPIENT);
console.log(encodedRecipient);

const encodedHash = web3.eth.abi.encodeParameter("string", HASH);
console.log(encodedHash);

const encodedABI = web3.eth.abi.encodeFunctionSignature(abi);
console.log(encodedABI);

const encodedParameters = web3.eth.abi.encodeParameters(['address', 'string'], [RECIPIENT, HASH]);
console.log(encodedParameters);

console.log(new Buffer(JSON.stringify(abi)))