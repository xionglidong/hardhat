// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ETHVault {
    // 定义事件：谁存了多少 ETH
    event Deposit(address indexed from, uint256 amount, string note);

    // 存入 ETH
    function deposit(string calldata note) external payable {
        require(msg.value > 0, "Must send ETH");
        emit Deposit(msg.sender, msg.value, note);
    }

    // 合约余额
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // 管理员提款（可选逻辑）
    function withdraw(address payable to, uint256 amount) external {
        require(amount <= address(this).balance, "Not enough balance");
        to.transfer(amount);
    }
}
