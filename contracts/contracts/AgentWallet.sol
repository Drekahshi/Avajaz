// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AgentWallet
 * @dev A treasury contract for the Green Verifier AI Agent.
 * Only the designated AI Agent address can trigger reward payouts,
 * and only the Owner (Admin) can fund or withdraw from the treasury.
 */
contract AgentWallet is Ownable {
    
    address public aiAgent;
    mapping(address => uint256) public userRewards;

    event AgentUpdated(address indexed oldAgent, address indexed newAgent);
    event RewardIssued(address indexed user, uint256 amount);
    event FundsDeposited(address indexed sender, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    /**
     * @dev Sets the initial AI Agent address.
     * @param initialOwner Address of the contract deployer/admin.
     * @param initialAgent Address of the Node.js AI Agent wallet.
     */
    constructor(address initialOwner, address initialAgent) Ownable(initialOwner) {
        require(initialAgent != address(0), "Invalid agent address");
        aiAgent = initialAgent;
    }

    /**
     * @dev Allows the owner to change the AI Agent address.
     */
    function setAIAgent(address newAgent) external onlyOwner {
        require(newAgent != address(0), "Invalid agent address");
        emit AgentUpdated(aiAgent, newAgent);
        aiAgent = newAgent;
    }

    /**
     * @dev Called by the AI Agent after successful verification to pay the user.
     * @param user The address of the user who completed the green task.
     * @param amount The reward amount in wei (e.g., 0.02 AVAX).
     */
    function verifyAndReward(address payable user, uint256 amount) external {
        require(msg.sender == aiAgent, "Only AI Agent can call this");
        require(address(this).balance >= amount, "Insufficient treasury balance");
        require(user != address(0), "Invalid user address");

        userRewards[user] += amount;
        
        // Transfer the AVAX reward
        (bool success, ) = user.call{value: amount}("");
        require(success, "Transfer failed");

        emit RewardIssued(user, amount);
    }

    /**
     * @dev Allows anyone (or the owner) to deposit AVAX into the agent's treasury.
     */
    receive() external payable {
        emit FundsDeposited(msg.sender, msg.value);
    }

    /**
     * @dev Allows the owner to withdraw unused funds from the treasury.
     */
    function withdrawTreasury(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Withdraw failed");
        emit FundsWithdrawn(owner(), amount);
    }

    /**
     * @dev Returns the current balance of the treasury.
     */
    function getTreasuryBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
