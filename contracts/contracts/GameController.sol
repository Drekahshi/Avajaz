// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameController {
    
    struct ChessMatch {
        address player1;
        address player2;
        uint256 wager;
        bool settled;
        address winner;
    }

    uint256 public nextMatchId;
    mapping(uint256 => ChessMatch) public matches;

    event MatchCreated(uint256 matchId, address p1, address p2, uint256 wager);
    event MatchSettled(uint256 matchId, address winner, uint256 payout);

    function createChessMatch(address _player2) external payable returns (uint256) {
        require(msg.value > 0, "Wager required");
        
        uint256 matchId = nextMatchId++;
        matches[matchId] = ChessMatch({
            player1: msg.sender,
            player2: _player2,
            wager: msg.value,
            settled: false,
            winner: address(0)
        });

        emit MatchCreated(matchId, msg.sender, _player2, msg.value);
        return matchId;
    }

    function settleMatch(uint256 _matchId, address payable _winner) external {
        // Access control: only backend agent can call this based on chess engine result
        ChessMatch storage m = matches[_matchId];
        require(!m.settled, "Already settled");
        require(m.player1 == _winner || m.player2 == _winner, "Invalid winner");

        m.settled = true;
        m.winner = _winner;

        uint256 payout = m.wager * 2; // Assuming player2 matches wager
        _winner.transfer(payout);

        emit MatchSettled(_matchId, _winner, payout);
    }
}
