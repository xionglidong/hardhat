// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleStorage
 * @dev 一个简单的存储合约，演示基本的存储和检索功能
 */
contract SimpleStorage is Ownable {
    // 存储的数据
    string private storedData;
    
    // 事件
    event DataStored(address indexed owner, string data, uint256 timestamp);
    event DataRetrieved(address indexed requester, string data, uint256 timestamp);
    
    // 构造函数
    constructor(address initialOwner) Ownable(initialOwner) {
        storedData = "Hello, Sepolia!";
    }
    
    /**
     * @dev 存储数据
     * @param _data 要存储的数据
     */
    function storeData(string memory _data) public onlyOwner {
        storedData = _data;
        emit DataStored(msg.sender, _data, block.timestamp);
    }
    
    /**
     * @dev 检索存储的数据
     * @return 存储的数据
     */
    function retrieveData() public view returns (string memory) {
        return storedData;
    }
    
    /**
     * @dev 获取合约信息
     * @return 合约地址、当前数据、所有者地址
     */
    function getContractInfo() public view returns (address, string memory, address) {
        return (address(this), storedData, owner());
    }
    
    /**
     * @dev 获取当前区块信息
     * @return 区块号、时间戳、区块哈希
     */
    function getBlockInfo() public view returns (uint256, uint256, bytes32) {
        return (block.number, block.timestamp, blockhash(block.number - 1));
    }
}
