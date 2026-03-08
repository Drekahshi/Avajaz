// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ActivityRegistry.sol";

contract VerificationContract {
    ActivityRegistry public registry;
    uint256 public requiredQuorum = 2; // For MVP

    struct VerificationState {
        uint256 confirms;
        uint256 rejects;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => VerificationState) public verifications;

    event VoteCast(uint256 indexed activityId, address indexed voter, bool vote);
    event ActivityValidated(uint256 indexed activityId);

    constructor(address _registryAddress) {
        registry = ActivityRegistry(_registryAddress);
    }

    function vote(uint256 _activityId, bool _isConfirm) external {
        VerificationState storage state = verifications[_activityId];
        require(!state.hasVoted[msg.sender], "Already voted");
        
        // In real impl: prevent owner from voting
        
        state.hasVoted[msg.sender] = true;
        if (_isConfirm) {
            state.confirms++;
        } else {
            state.rejects++;
        }

        emit VoteCast(_activityId, msg.sender, _isConfirm);

        if (state.confirms >= requiredQuorum) {
            registry.advanceState(_activityId, ActivityRegistry.State.Validated);
            emit ActivityValidated(_activityId);
        }
    }
}
