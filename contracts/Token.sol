// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyToken
 * @dev 一个简单的ERC20代币合约
 */
contract MyToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1,000,000 代币
    
    constructor(address initialOwner) 
        ERC20("MyToken", "MTK") 
        Ownable(initialOwner) 
    {
        _mint(initialOwner, INITIAL_SUPPLY);
    }
    
    /**
     * @dev 铸造新代币 (仅所有者)
     * @param to 接收地址
     * @param amount 铸造数量
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev 销毁代币
     * @param amount 销毁数量
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev 获取代币统计信息
     * @return 总供应量、当前余额
     */
    function getTokenStats() public view returns (uint256, uint256) {
        return (totalSupply(), balanceOf(msg.sender));
    }
}

