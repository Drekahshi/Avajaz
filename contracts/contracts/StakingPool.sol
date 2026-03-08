// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StakingPool
 * @dev Users stake AVAX and earn yield over time. Yield comes from
 * game revenues deposited by the platform owner.
 */
contract StakingPool is Ownable {

    struct Staker {
        uint256 amount;
        uint256 stakedAt;
        uint256 rewardDebt;
    }

    mapping(address => Staker) public stakers;
    uint256 public totalStaked;
    uint256 public rewardPerToken;
    uint256 public totalRewardDeposited;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    event RewardDeposited(uint256 amount);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function stake() external payable {
        require(msg.value > 0, "Must stake > 0");

        _updateReward(msg.sender);
        stakers[msg.sender].amount += msg.value;
        stakers[msg.sender].stakedAt = block.timestamp;
        totalStaked += msg.value;

        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 _amount) external {
        Staker storage s = stakers[msg.sender];
        require(s.amount >= _amount, "Insufficient staked balance");

        _updateReward(msg.sender);
        s.amount -= _amount;
        totalStaked -= _amount;

        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Transfer failed");

        emit Unstaked(msg.sender, _amount);
    }

    function claimReward() external {
        _updateReward(msg.sender);
        uint256 reward = stakers[msg.sender].rewardDebt;
        require(reward > 0, "No reward");

        stakers[msg.sender].rewardDebt = 0;
        (bool success, ) = payable(msg.sender).call{value: reward}("");
        require(success, "Transfer failed");

        emit RewardClaimed(msg.sender, reward);
    }

    /// @dev Owner deposits game revenue to distribute to stakers
    function depositReward() external payable onlyOwner {
        require(totalStaked > 0, "No stakers");
        rewardPerToken += (msg.value * 1e18) / totalStaked;
        totalRewardDeposited += msg.value;
        emit RewardDeposited(msg.value);
    }

    function _updateReward(address _user) internal {
        Staker storage s = stakers[_user];
        if (s.amount > 0) {
            s.rewardDebt += (s.amount * rewardPerToken) / 1e18;
        }
    }

    function getStakeInfo(address _user) external view returns (uint256 staked, uint256 pendingReward) {
        Staker storage s = stakers[_user];
        staked = s.amount;
        pendingReward = s.rewardDebt + ((s.amount * rewardPerToken) / 1e18);
    }

    receive() external payable {}
}
