import * as ethers from 'ethers';
import abi from '../abi.json';

export { encodeURISetABI };

function encodeURISetABI(tokenId: number, hash: string) : string {
    // @ts-ignore
    const iface = new ethers.utils.Interface(abi);
    // @ts-ignore
    let encodedABI = iface.getSighash("setTokenURI");

    // @ts-ignore
    const abiCoder = new ethers.utils.AbiCoder();
    const params = abiCoder.encode(['uint256', 'string'], [tokenId, hash]);
    encodedABI += params.replace('0x', '');

    return encodedABI;
}