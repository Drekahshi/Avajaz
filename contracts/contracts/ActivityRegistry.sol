// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ActivityRegistry {
    enum ActivityType { TreePlanting, SeedlingNursery, Beekeeping, Ecotourism }
    enum State { Unregistered, Registered, Stage1, Stage2, Stage3, Validated, Productized }

    struct Activity {
        address owner;
        ActivityType activityType;
        string locationGeoHash;
        string metadataURI; // IPFS
        State state;
    }

    mapping(uint256 => Activity) public activities;
    uint256 public activityCount;

    event ActivityRegistered(uint256 indexed activityId, address indexed owner);
    event StateChanged(uint256 indexed activityId, State newState);

    function registerActivity(
        ActivityType _type,
        string memory _locationGeoHash,
        string memory _metadataURI
    ) public returns (uint256) {
        activityCount++;
        activities[activityCount] = Activity({
            owner: msg.sender,
            activityType: _type,
            locationGeoHash: _locationGeoHash,
            metadataURI: _metadataURI,
            state: State.Registered
        });

        emit ActivityRegistered(activityCount, msg.sender);
        return activityCount;
    }

    function advanceState(uint256 _activityId, State _newState) external {
        // Access control left mock for MVP boilerplate
        activities[_activityId].state = _newState;
        emit StateChanged(_activityId, _newState);
    }
}
