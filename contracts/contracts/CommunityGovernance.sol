// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CommunityGovernance
 * @dev Simple on-chain governance for CFA user groups.
 * Members propose and vote on platform upgrades, reward rates, 
 * and verification quorum thresholds.
 */
contract CommunityGovernance is Ownable {

    enum ProposalStatus { Active, Passed, Rejected, Executed }

    struct Proposal {
        string title;
        string description;
        address proposer;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 endTime;
        ProposalStatus status;
        bool executed;
    }

    uint256 public nextProposalId;
    uint256 public votingDuration = 3 days;
    uint256 public quorum = 5; // Minimum votes to resolve
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 indexed proposalId, string title, address proposer);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalResolved(uint256 indexed proposalId, ProposalStatus status);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function propose(string calldata _title, string calldata _description) external returns (uint256) {
        uint256 id = nextProposalId++;
        proposals[id] = Proposal({
            title: _title,
            description: _description,
            proposer: msg.sender,
            yesVotes: 0,
            noVotes: 0,
            endTime: block.timestamp + votingDuration,
            status: ProposalStatus.Active,
            executed: false
        });

        emit ProposalCreated(id, _title, msg.sender);
        return id;
    }

    function vote(uint256 _proposalId, bool _support) external {
        Proposal storage p = proposals[_proposalId];
        require(p.status == ProposalStatus.Active, "Not active");
        require(block.timestamp < p.endTime, "Voting ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");

        hasVoted[_proposalId][msg.sender] = true;
        if (_support) {
            p.yesVotes++;
        } else {
            p.noVotes++;
        }

        emit VoteCast(_proposalId, msg.sender, _support);
    }

    function resolveProposal(uint256 _proposalId) external {
        Proposal storage p = proposals[_proposalId];
        require(p.status == ProposalStatus.Active, "Not active");
        require(block.timestamp >= p.endTime, "Voting not ended");
        require(p.yesVotes + p.noVotes >= quorum, "Quorum not reached");

        p.status = p.yesVotes > p.noVotes ? ProposalStatus.Passed : ProposalStatus.Rejected;
        emit ProposalResolved(_proposalId, p.status);
    }

    function setVotingDuration(uint256 _duration) external onlyOwner {
        votingDuration = _duration;
    }

    function setQuorum(uint256 _quorum) external onlyOwner {
        quorum = _quorum;
    }
}
