// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RewardDistribution {
    address public owner;
    address public cfaTreasury;

    event RewardDistributed(address indexed verifier, uint256 verifierAmount, uint256 peerAmount, uint256 cfaAmount);
    
    constructor(address _cfaTreasury) {
        owner = msg.sender;
        cfaTreasury = _cfaTreasury;
    }

    // Must be payable to receive AVAX for distribution
    receive() external payable {}

    function distributeReward(address payable _verifier, address payable[] calldata _peers, uint256 _totalAmount) external {
        require(msg.sender == owner, "Only owner can distribute");
        require(address(this).balance >= _totalAmount, "Insufficient AVAX");

        uint256 verifierShare = (_totalAmount * 70) / 100;
        uint256 peerShareTotal = (_totalAmount * 20) / 100;
        uint256 treasuryShare = (_totalAmount * 10) / 100;

        uint256 peerShare = _peers.length > 0 ? peerShareTotal / _peers.length : 0;

        _verifier.transfer(verifierShare);
        cfaTreasury.call{value: treasuryShare}("");
        
        for (uint i = 0; i < _peers.length; i++) {
            _peers[i].transfer(peerShare);
        }

        emit RewardDistributed(_verifier, verifierShare, peerShareTotal, treasuryShare);
    }
}
