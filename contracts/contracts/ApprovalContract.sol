// SPDX-License-Identifier: MIT
pragma solidity ^0.4.18;

contract ApprovalContract {
  // constructor() public {
  // }
  address public sender;
  address public receiver;
  address public constant approver = 0xa588738615d8aA08628c77d86C88EF26aBd7FC6a;

  function deposit(address _receiver) external payable{
    require(msg.value > 0);
    sender = msg.sender;
    receiver = _receiver;
  }

  function viewApprover() external pure returns(address){
    return(approver);
  }

  function approve() external {
    require(msg.sender == approver);
    receiver.transfer(address(this).balance);
  }





}
