const { ethers } = require("hardhat");

async function main() {
  console.log("开始与 SimpleGraph 合约交互...");
  
  // 获取账户
  const [deployer, user1] = await ethers.getSigners();
  console.log("部署者地址:", deployer.address);
  console.log("用户1地址:", user1.address);
  
  // 从部署信息文件读取合约地址
  const fs = require("fs");
  let deploymentInfo;
  try {
    const data = fs.readFileSync("deployment-info.json", "utf8");
    deploymentInfo = JSON.parse(data);
  } catch (error) {
    console.error("无法读取部署信息文件:", error.message);
    return;
  }
  
  const contractAddress = deploymentInfo.contracts.SimpleGraph;
  console.log("合约地址:", contractAddress);
  
  // 连接合约
  const SimpleGraph = await ethers.getContractFactory("SimpleGraph");
  const contract = SimpleGraph.attach(contractAddress);
  
  // 测试1: 记录消息（不发送ETH）
  console.log("\n=== 测试1: 记录消息 ===");
  const message1 = "Hello, The Graph!";
  console.log("记录消息:", message1);
  const tx1 = await contract.recordMessage(message1);
  await tx1.wait();
  console.log("交易哈希:", tx1.hash);
  
  // 测试2: 记录交易信息（发送ETH）
  console.log("\n=== 测试2: 记录交易信息 ===");
  const message2 = "Transfer with message";
  const value = ethers.parseEther("0.001"); // 0.001 ETH
  console.log("发送ETH:", ethers.formatEther(value));
  console.log("附言:", message2);
  const tx2 = await contract.recordTransaction(user1.address, message2, { value });
  await tx2.wait();
  console.log("交易哈希:", tx2.hash);
  
  // 测试3: 记录16进制消息
  console.log("\n=== 测试3: 记录16进制消息 ===");
  const hexMessage = "0x48656c6c6f20576f726c64"; // "Hello World" 的16进制
  console.log("16进制消息:", hexMessage);
  const tx3 = await contract.recordMessage(hexMessage);
  await tx3.wait();
  console.log("交易哈希:", tx3.hash);
  
  // 查询合约信息
  console.log("\n=== 查询合约信息 ===");
  const contractInfo = await contract.getContractInfo();
  console.log("消息总数:", contractInfo[0].toString());
  console.log("合约地址:", contractInfo[1]);
  console.log("当前区块:", contractInfo[2].toString());
  
  // 查询用户余额
  console.log("\n=== 账户余额 ===");
  const deployerBalance = await ethers.provider.getBalance(deployer.address);
  const user1Balance = await ethers.provider.getBalance(user1.address);
  console.log("部署者余额:", ethers.formatEther(deployerBalance), "ETH");
  console.log("用户1余额:", ethers.formatEther(user1Balance), "ETH");
  
  console.log("\n交互完成!");
  console.log("所有交易都已记录，The Graph可以索引这些事件。");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("交互失败:", error);
    process.exit(1);
  });
