//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Tipjar contract that allows users to send tips in the form of Ether
contract TipJar {
    // Owner public address
    address public owner;
    // Structure to store tip messages
    struct Tip {
        string message;
        uint256 amount;
        uint256 timestamp;
    }
    // Mapping to store tips by address
    mapping(address => Tip[]) public tipsByAddress;
    //Event Owner
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    // Event to log tips received
    event NewTip(address indexed from, uint256 amount, string message);
    //Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not Authorized: you are not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnerSet(address(0), msg.sender);
    }

    // Function to receive tips
    function tip(string memory _message) public payable {
        require(msg.value > 0, "Tip must be greater than zero");
        Tip memory newTip = Tip({
            message: _message,
            amount: msg.value,
            timestamp: block.timestamp
        });
        tipsByAddress[msg.sender].push(newTip);
        emit NewTip(msg.sender, msg.value, _message);
    }

    function getTipsByAddress(
        address _addr
    ) external view returns (Tip[] memory) {
        return tipsByAddress[_addr];
    }

    // Function to withdraw tips
    function withdraw() public onlyOwner {
        require(msg.sender == owner, "You aren't the owner");
        payable(owner).transfer(address(this).balance);
    }
}
