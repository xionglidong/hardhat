const { ethers } = require("hardhat");

async function main() {
  console.log("开始部署合约到Sepolia测试网...");
  
  // 获取部署者账户
  const [deployer] = await ethers.getSigners();
  console.log("部署者地址:", deployer.address);
  console.log("部署者余额:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");
  
  // 部署 SimpleStorage 合约
  console.log("\n部署 SimpleStorage 合约...");
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy(deployer.address);
  await simpleStorage.waitForDeployment();
  const simpleStorageAddress = await simpleStorage.getAddress();
  console.log("SimpleStorage 合约地址:", simpleStorageAddress);
  
  // 部署 MyToken 合约
  console.log("\n部署 MyToken 合约...");
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(deployer.address);
  await myToken.waitForDeployment();
  const myTokenAddress = await myToken.getAddress();
  console.log("MyToken 合约地址:", myTokenAddress);
  
  // 验证部署
  console.log("\n验证部署...");
  const storedData = await simpleStorage.retrieveData();
  console.log("SimpleStorage 初始数据:", storedData);
  
  const tokenName = await myToken.name();
  const tokenSymbol = await myToken.symbol();
  const totalSupply = await myToken.totalSupply();
  console.log("MyToken 信息:");
  console.log("  名称:", tokenName);
  console.log("  符号:", tokenSymbol);
  console.log("  总供应量:", ethers.formatEther(totalSupply));
  
  console.log("\n部署完成!");
  console.log("合约地址:");
  console.log("  SimpleStorage:", simpleStorageAddress);
  console.log("  MyToken:", myTokenAddress);
  
  // 保存部署信息到文件
  const fs = require("fs");
  const deploymentInfo = {
    network: "sepolia",
    deployer: deployer.address,
    contracts: {
      SimpleStorage: simpleStorageAddress,
      MyToken: myTokenAddress
    },
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    "deployment-info.json", 
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\n部署信息已保存到 deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("部署失败:", error);
    process.exit(1);
  });

