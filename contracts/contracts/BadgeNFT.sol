// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BadgeNFT
 * @dev ERC-721 badges awarded for platform achievements.
 * Badges are non-transferable (soulbound) and carry rarity metadata.
 */
contract BadgeNFT is ERC721, Ownable {

    enum Rarity { Common, Rare, Epic, Legendary }

    struct Badge {
        string name;
        string description;
        Rarity rarity;
        uint256 mintedAt;
    }

    uint256 public nextBadgeId;
    mapping(uint256 => Badge) public badges;
    mapping(address => uint256[]) public userBadges;

    event BadgeAwarded(address indexed to, uint256 indexed tokenId, string name, Rarity rarity);

    constructor(address initialOwner) ERC721("AVAJAZ Badge", "AVJZBDG") Ownable(initialOwner) {}

    /// @dev Only the platform (owner) can award badges
    function awardBadge(
        address _to,
        string calldata _name,
        string calldata _description,
        Rarity _rarity
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = nextBadgeId++;
        badges[tokenId] = Badge({
            name: _name,
            description: _description,
            rarity: _rarity,
            mintedAt: block.timestamp
        });

        _mint(_to, tokenId);
        userBadges[_to].push(tokenId);

        emit BadgeAwarded(_to, tokenId, _name, _rarity);
        return tokenId;
    }

    /// @dev Soulbound — prevent transfers
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        // Allow mint (from == address(0)) and burn, block transfers
        require(from == address(0) || to == address(0), "Soulbound: non-transferable");
        return super._update(to, tokenId, auth);
    }

    function getUserBadges(address _user) external view returns (uint256[] memory) {
        return userBadges[_user];
    }

    function getBadgeInfo(uint256 _tokenId) external view returns (Badge memory) {
        return badges[_tokenId];
    }
}
