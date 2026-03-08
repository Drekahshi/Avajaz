// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Need OpenZeppelin ERC721. We will mock the interface for boilerplate.
contract NFTMintContract {
    string public name = "AVAJAZ Activity NFT";
    string public symbol = "AVJZ";
    uint256 public nextTokenId;

    mapping(uint256 => address) public owners;
    mapping(uint256 => string) public tokenURIs;

    event Minted(address indexed to, uint256 indexed tokenId, string uri);

    function mintNFT(address to, string memory uri) public returns (uint256) {
        uint256 tokenId = nextTokenId++;
        owners[tokenId] = to;
        tokenURIs[tokenId] = uri;
        
        emit Minted(to, tokenId, uri);
        return tokenId;
    }
}
