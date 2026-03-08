// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PredictionMarket
 * @dev Allows users to create binary outcome markets and bet on YES/NO outcomes.
 * Resolution is handled by the owner (oracle) for MVP.
 */
contract PredictionMarket is Ownable {

    enum Outcome { Unresolved, Yes, No }

    struct Market {
        string question;
        uint256 endTime;
        uint256 yesPool;
        uint256 noPool;
        Outcome outcome;
        bool resolved;
        address creator;
    }

    uint256 public nextMarketId;
    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => uint256)) public yesBets;
    mapping(uint256 => mapping(address => uint256)) public noBets;

    event MarketCreated(uint256 indexed marketId, string question, uint256 endTime, address creator);
    event BetPlaced(uint256 indexed marketId, address indexed bettor, bool isYes, uint256 amount);
    event MarketResolved(uint256 indexed marketId, Outcome outcome);
    event WinningsClaimed(uint256 indexed marketId, address indexed bettor, uint256 amount);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createMarket(string calldata _question, uint256 _duration) external returns (uint256) {
        uint256 marketId = nextMarketId++;
        markets[marketId] = Market({
            question: _question,
            endTime: block.timestamp + _duration,
            yesPool: 0,
            noPool: 0,
            outcome: Outcome.Unresolved,
            resolved: false,
            creator: msg.sender
        });
        emit MarketCreated(marketId, _question, block.timestamp + _duration, msg.sender);
        return marketId;
    }

    function bet(uint256 _marketId, bool _isYes) external payable {
        Market storage m = markets[_marketId];
        require(!m.resolved, "Market already resolved");
        require(block.timestamp < m.endTime, "Market has ended");
        require(msg.value > 0, "Bet must be > 0");

        if (_isYes) {
            m.yesPool += msg.value;
            yesBets[_marketId][msg.sender] += msg.value;
        } else {
            m.noPool += msg.value;
            noBets[_marketId][msg.sender] += msg.value;
        }
        emit BetPlaced(_marketId, msg.sender, _isYes, msg.value);
    }

    function resolveMarket(uint256 _marketId, bool _yesWins) external onlyOwner {
        Market storage m = markets[_marketId];
        require(!m.resolved, "Already resolved");
        m.resolved = true;
        m.outcome = _yesWins ? Outcome.Yes : Outcome.No;
        emit MarketResolved(_marketId, m.outcome);
    }

    function claimWinnings(uint256 _marketId) external {
        Market storage m = markets[_marketId];
        require(m.resolved, "Not resolved yet");

        uint256 payout = 0;
        uint256 totalPool = m.yesPool + m.noPool;

        if (m.outcome == Outcome.Yes && yesBets[_marketId][msg.sender] > 0) {
            uint256 share = yesBets[_marketId][msg.sender];
            payout = (share * totalPool) / m.yesPool;
            yesBets[_marketId][msg.sender] = 0;
        } else if (m.outcome == Outcome.No && noBets[_marketId][msg.sender] > 0) {
            uint256 share = noBets[_marketId][msg.sender];
            payout = (share * totalPool) / m.noPool;
            noBets[_marketId][msg.sender] = 0;
        }

        require(payout > 0, "No winnings");
        (bool success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Transfer failed");
        emit WinningsClaimed(_marketId, msg.sender, payout);
    }

    function getMarketOdds(uint256 _marketId) external view returns (uint256 yesPercent, uint256 noPercent) {
        Market storage m = markets[_marketId];
        uint256 total = m.yesPool + m.noPool;
        if (total == 0) return (50, 50);
        yesPercent = (m.yesPool * 100) / total;
        noPercent = 100 - yesPercent;
    }
}
