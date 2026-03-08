// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EscrowManager
 * @dev Holds AVAX in escrow for game matches, wagers, and activity bounties.
 * Funds are released only upon verified completion of conditions.
 */
contract EscrowManager is Ownable {

    enum EscrowStatus { Active, Released, Refunded }

    struct Escrow {
        address depositor;
        address beneficiary;
        uint256 amount;
        string purpose;
        EscrowStatus status;
        uint256 createdAt;
    }

    uint256 public nextEscrowId;
    mapping(uint256 => Escrow) public escrows;

    event EscrowCreated(uint256 indexed escrowId, address indexed depositor, address beneficiary, uint256 amount, string purpose);
    event EscrowReleased(uint256 indexed escrowId, address indexed beneficiary, uint256 amount);
    event EscrowRefunded(uint256 indexed escrowId, address indexed depositor, uint256 amount);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createEscrow(address _beneficiary, string calldata _purpose) external payable returns (uint256) {
        require(msg.value > 0, "Must deposit > 0");
        require(_beneficiary != address(0), "Invalid beneficiary");

        uint256 id = nextEscrowId++;
        escrows[id] = Escrow({
            depositor: msg.sender,
            beneficiary: _beneficiary,
            amount: msg.value,
            purpose: _purpose,
            status: EscrowStatus.Active,
            createdAt: block.timestamp
        });

        emit EscrowCreated(id, msg.sender, _beneficiary, msg.value, _purpose);
        return id;
    }

    /// @dev Owner (platform/AI agent) releases funds to the beneficiary
    function release(uint256 _escrowId) external onlyOwner {
        Escrow storage e = escrows[_escrowId];
        require(e.status == EscrowStatus.Active, "Not active");

        e.status = EscrowStatus.Released;
        (bool success, ) = payable(e.beneficiary).call{value: e.amount}("");
        require(success, "Transfer failed");

        emit EscrowReleased(_escrowId, e.beneficiary, e.amount);
    }

    /// @dev Owner can refund the depositor if conditions aren't met
    function refund(uint256 _escrowId) external onlyOwner {
        Escrow storage e = escrows[_escrowId];
        require(e.status == EscrowStatus.Active, "Not active");

        e.status = EscrowStatus.Refunded;
        (bool success, ) = payable(e.depositor).call{value: e.amount}("");
        require(success, "Transfer failed");

        emit EscrowRefunded(_escrowId, e.depositor, e.amount);
    }

    function getEscrowInfo(uint256 _escrowId) external view returns (Escrow memory) {
        return escrows[_escrowId];
    }
}
