// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title PredictionMarket
 * @dev Binary outcome prediction market with fee collection, reentrancy protection,
 *      pause functionality, and creator fee rewards.
 */
contract PredictionMarket is Ownable, ReentrancyGuard, Pausable {

    enum Outcome { Unresolved, Yes, No, Cancelled }

    struct Market {
        string   question;
        uint256  endTime;
        uint256  yesPool;
        uint256  noPool;
        Outcome  outcome;
        bool     resolved;
        address  creator;
        uint256  creatorFeePercent; // basis points e.g. 100 = 1%
    }

    // ── Constants ────────────────────────────────────────────────────────────
    uint256 public constant MAX_DURATION      = 365 days;
    uint256 public constant MIN_DURATION      = 1 hours;
    uint256 public constant PLATFORM_FEE_BPS  = 200;   // 2%
    uint256 public constant MAX_CREATOR_FEE   = 500;   // 5% max
    uint256 public constant BPS_DENOMINATOR   = 10_000;
    uint256 public constant MIN_BET           = 0.001 ether;

    // ── State ─────────────────────────────────────────────────────────────────
    uint256 public nextMarketId;
    uint256 public collectedFees;

    mapping(uint256 => Market)                          public markets;
    mapping(uint256 => mapping(address => uint256))     public yesBets;
    mapping(uint256 => mapping(address => uint256))     public noBets;
    mapping(uint256 => mapping(address => bool))        public hasClaimed;
    mapping(address => bool)                            public approvedResolvers;

    // ── Events ────────────────────────────────────────────────────────────────
    event MarketCreated(uint256 indexed marketId, string question, uint256 endTime, address indexed creator, uint256 creatorFee);
    event BetPlaced(uint256 indexed marketId, address indexed bettor, bool isYes, uint256 amount);
    event MarketResolved(uint256 indexed marketId, Outcome outcome);
    event WinningsClaimed(uint256 indexed marketId, address indexed bettor, uint256 amount);
    event MarketCancelled(uint256 indexed marketId);
    event RefundClaimed(uint256 indexed marketId, address indexed bettor, uint256 amount);
    event ResolverUpdated(address indexed resolver, bool approved);
    event FeesWithdrawn(address indexed to, uint256 amount);

    // ── Modifiers ─────────────────────────────────────────────────────────────
    modifier onlyResolver() {
        require(approvedResolvers[msg.sender] || msg.sender == owner(), "Not a resolver");
        _;
    }

    modifier marketExists(uint256 _marketId) {
        require(_marketId < nextMarketId, "Market does not exist");
        _;
    }

    // ── Constructor ───────────────────────────────────────────────────────────
    constructor(address initialOwner) Ownable(initialOwner) {
        approvedResolvers[initialOwner] = true;
    }

    // ── Market Management ─────────────────────────────────────────────────────

    /**
     * @notice Create a new prediction market
     * @param _question       The binary question being asked
     * @param _duration       Duration in seconds (min 1hr, max 365 days)
     * @param _creatorFeeBps  Creator fee in basis points (max 500 = 5%)
     */
    function createMarket(
        string  calldata _question,
        uint256 _duration,
        uint256 _creatorFeeBps
    ) external whenNotPaused returns (uint256) {
        require(bytes(_question).length > 0,       "Empty question");
        require(bytes(_question).length <= 280,    "Question too long");
        require(_duration >= MIN_DURATION,         "Duration too short");
        require(_duration <= MAX_DURATION,         "Duration too long");
        require(_creatorFeeBps <= MAX_CREATOR_FEE, "Creator fee too high");

        uint256 marketId = nextMarketId++;
        markets[marketId] = Market({
            question:         _question,
            endTime:          block.timestamp + _duration,
            yesPool:          0,
            noPool:           0,
            outcome:          Outcome.Unresolved,
            resolved:         false,
            creator:          msg.sender,
            creatorFeePercent: _creatorFeeBps
        });

        emit MarketCreated(marketId, _question, block.timestamp + _duration, msg.sender, _creatorFeeBps);
        return marketId;
    }

    /**
     * @notice Place a bet on YES or NO
     */
    function bet(
        uint256 _marketId,
        bool    _isYes
    ) external payable nonReentrant whenNotPaused marketExists(_marketId) {
        Market storage m = markets[_marketId];
        require(!m.resolved,                  "Market already resolved");
        require(block.timestamp < m.endTime,  "Market has ended");
        require(msg.value >= MIN_BET,         "Bet below minimum");

        // Deduct platform fee
        uint256 platformFee = (msg.value * PLATFORM_FEE_BPS) / BPS_DENOMINATOR;
        uint256 netBet      = msg.value - platformFee;
        collectedFees      += platformFee;

        if (_isYes) {
            m.yesPool                        += netBet;
            yesBets[_marketId][msg.sender]   += netBet;
        } else {
            m.noPool                         += netBet;
            noBets[_marketId][msg.sender]    += netBet;
        }

        emit BetPlaced(_marketId, msg.sender, _isYes, netBet);
    }

    /**
     * @notice Resolve a market — callable by owner or approved resolver
     */
    function resolveMarket(
        uint256 _marketId,
        bool    _yesWins
    ) external onlyResolver marketExists(_marketId) {
        Market storage m = markets[_marketId];
        require(!m.resolved,                   "Already resolved");
        require(block.timestamp >= m.endTime,  "Market still active");

        m.resolved = true;
        m.outcome  = _yesWins ? Outcome.Yes : Outcome.No;

        emit MarketResolved(_marketId, m.outcome);
    }

    /**
     * @notice Cancel a market and enable refunds (owner only)
     */
    function cancelMarket(uint256 _marketId) external onlyOwner marketExists(_marketId) {
        Market storage m = markets[_marketId];
        require(!m.resolved, "Already resolved");

        m.resolved = true;
        m.outcome  = Outcome.Cancelled;

        emit MarketCancelled(_marketId);
    }

    /**
     * @notice Claim winnings after market resolution
     */
    function claimWinnings(uint256 _marketId) external nonReentrant marketExists(_marketId) {
        Market storage m = markets[_marketId];
        require(m.resolved,                        "Not resolved yet");
        require(m.outcome != Outcome.Cancelled,    "Market cancelled — use claimRefund");
        require(!hasClaimed[_marketId][msg.sender], "Already claimed");

        hasClaimed[_marketId][msg.sender] = true;

        uint256 userBet    = m.outcome == Outcome.Yes
            ? yesBets[_marketId][msg.sender]
            : noBets[_marketId][msg.sender];

        require(userBet > 0, "No winning bet");

        uint256 winningPool = m.outcome == Outcome.Yes ? m.yesPool : m.noPool;
        uint256 totalPool   = m.yesPool + m.noPool;

        // Deduct creator fee from total pool
        uint256 creatorFee  = (totalPool * m.creatorFeePercent) / BPS_DENOMINATOR;
        uint256 payoutPool  = totalPool - creatorFee;

        uint256 payout      = (userBet * payoutPool) / winningPool;

        // Pay creator fee
        if (creatorFee > 0) {
            (bool feeSuccess, ) = payable(m.creator).call{value: creatorFee}("");
            require(feeSuccess, "Creator fee transfer failed");
        }

        (bool success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Transfer failed");

        emit WinningsClaimed(_marketId, msg.sender, payout);
    }

    /**
     * @notice Claim refund if market was cancelled
     */
    function claimRefund(uint256 _marketId) external nonReentrant marketExists(_marketId) {
        Market storage m = markets[_marketId];
        require(m.outcome == Outcome.Cancelled,     "Market not cancelled");
        require(!hasClaimed[_marketId][msg.sender],  "Already claimed");

        hasClaimed[_marketId][msg.sender] = true;

        uint256 refund = yesBets[_marketId][msg.sender] + noBets[_marketId][msg.sender];
        require(refund > 0, "Nothing to refund");

        (bool success, ) = payable(msg.sender).call{value: refund}("");
        require(success, "Refund failed");

        emit RefundClaimed(_marketId, msg.sender, refund);
    }

    // ── Admin ─────────────────────────────────────────────────────────────────

    function setResolver(address _resolver, bool _approved) external onlyOwner {
        approvedResolvers[_resolver] = _approved;
        emit ResolverUpdated(_resolver, _approved);
    }

    function withdrawFees(address _to) external onlyOwner nonReentrant {
        require(_to != address(0), "Invalid address");
        uint256 amount = collectedFees;
        collectedFees  = 0;
        (bool success, ) = payable(_to).call{value: amount}("");
        require(success, "Withdraw failed");
        emit FeesWithdrawn(_to, amount);
    }

    function pause()   external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // ── Views ─────────────────────────────────────────────────────────────────

    function getMarketOdds(uint256 _marketId) external view marketExists(_marketId)
        returns (uint256 yesPercent, uint256 noPercent)
    {
        Market storage m = markets[_marketId];
        uint256 total = m.yesPool + m.noPool;
        if (total == 0) return (50, 50);
        yesPercent = (m.yesPool * 100) / total;
        noPercent  = 100 - yesPercent;
    }

    function getMarket(uint256 _marketId) external view marketExists(_marketId)
        returns (Market memory)
    {
        return markets[_marketId];
    }

    function getUserBets(uint256 _marketId, address _user) external view
        returns (uint256 yes, uint256 no)
    {
        return (yesBets[_marketId][_user], noBets[_marketId][_user]);
    }
}