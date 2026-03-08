// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFTMarketplace
 * @dev P2P marketplace for buying/selling AVAJAZ Activity NFTs.
 * Seller lists an NFT, buyer pays AVAX, platform takes a 2.5% fee.
 */
contract NFTMarketplace is Ownable {

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    uint256 public nextListingId;
    uint256 public platformFeeBps = 250; // 2.5%
    mapping(uint256 => Listing) public listings;
    uint256 public totalVolume;

    event Listed(uint256 indexed listingId, address indexed seller, address nftContract, uint256 tokenId, uint256 price);
    event Sold(uint256 indexed listingId, address indexed buyer, uint256 price);
    event Delisted(uint256 indexed listingId);
    event FeeUpdated(uint256 newFeeBps);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function list(address _nftContract, uint256 _tokenId, uint256 _price) external returns (uint256) {
        require(_price > 0, "Price must be > 0");

        uint256 listingId = nextListingId++;
        listings[listingId] = Listing({
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            price: _price,
            active: true
        });

        emit Listed(listingId, msg.sender, _nftContract, _tokenId, _price);
        return listingId;
    }

    function buy(uint256 _listingId) external payable {
        Listing storage l = listings[_listingId];
        require(l.active, "Not active");
        require(msg.value >= l.price, "Insufficient payment");

        l.active = false;
        totalVolume += l.price;

        uint256 fee = (l.price * platformFeeBps) / 10000;
        uint256 sellerProceeds = l.price - fee;

        (bool s1, ) = payable(l.seller).call{value: sellerProceeds}("");
        require(s1, "Seller transfer failed");

        (bool s2, ) = payable(owner()).call{value: fee}("");
        require(s2, "Fee transfer failed");

        // Refund overpayment
        if (msg.value > l.price) {
            (bool s3, ) = payable(msg.sender).call{value: msg.value - l.price}("");
            require(s3, "Refund failed");
        }

        emit Sold(_listingId, msg.sender, l.price);
    }

    function delist(uint256 _listingId) external {
        Listing storage l = listings[_listingId];
        require(l.seller == msg.sender, "Not the seller");
        require(l.active, "Not active");
        l.active = false;
        emit Delisted(_listingId);
    }

    function updateFee(uint256 _newFeeBps) external onlyOwner {
        require(_newFeeBps <= 1000, "Max 10%");
        platformFeeBps = _newFeeBps;
        emit FeeUpdated(_newFeeBps);
    }
}
