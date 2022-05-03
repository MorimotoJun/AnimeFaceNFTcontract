import * as ethers from 'ethers';
import abi from '../abi.json';

export { encodeMintABI };

function encodeMintABI(recipient: string, hash: string) : string {
    // @ts-ignore
    const iface = new ethers.utils.Interface(abi);
    // @ts-ignore
    let encodedABI = iface.getSighash("mintNFT");

    // @ts-ignore
    const abiCoder = new ethers.utils.AbiCoder();
    const params = abiCoder.encode(['address', 'string'], [recipient, hash]);
    encodedABI += params.replace('0x', '');

    return encodedABI;
}