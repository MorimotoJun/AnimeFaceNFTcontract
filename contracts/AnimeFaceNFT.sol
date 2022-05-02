// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AnimeFaceNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("AnimeFaceNFT", "AFN") {}

    /**
     * Override isApprovedForAll to auto-approve OS's proxy contract
     */
    function _baseURI()
        internal
        view
        virtual
        override
        returns (string memory)
    {
        return "https://gateway.pinata.cloud/ipfs/";
    }

    /**
     * Override isApprovedForAll to auto-approve OS's proxy contract
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        override
        returns (bool isOperator)
    {
        // if OpenSea's ERC721 Proxy Address is detected, auto-return true
        if (_operator == address(0x58807baD0B376efc12F5AD86aAc70E78ed67deaE)) {
            return true;
        }

        // otherwise, use the default ERC721.isApprovedForAll()
        return ERC721.isApprovedForAll(_owner, _operator);
    }

    function mintNFT(address recipient, string memory ipfsHash)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, ipfsHash);

        return newItemId;
    }

    function burnNFT(uint256 tokenId)
        public
    {
        _burn(tokenId);
    }

    function ownedTokens() public view onlyOwner returns (string[] memory) {
        uint256 mintedCount = _tokenIds.current();
        string[] memory result = new string[](mintedCount);
        uint256 resultIndex = 0;
        uint256 tokenId = 1;
        while (tokenId <= mintedCount) {
            result[resultIndex] = tokenURI(tokenId);
            resultIndex++;
            tokenId++;
        }
        return result;
    }
}