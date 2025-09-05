const { ethers } = require("hardhat");

async function main() {
  console.log("合约交互演示脚本");
  
  // 如果您有已部署的合约地址，可以在这里使用
  // 否则，这个脚本会部署新合约进行演示
  
  const [deployer] = await ethers.getSigners();
  console.log("使用账户:", deployer.address);
  console.log("账户余额:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");
  
  // 部署 SimpleStorage 合约
  console.log("\n=== 部署 SimpleStorage 合约 ===");
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy(deployer.address);
  await simpleStorage.waitForDeployment();
  const simpleStorageAddress = await simpleStorage.getAddress();
  console.log("SimpleStorage 合约地址:", simpleStorageAddress);
  
  // 演示 SimpleStorage 功能
  console.log("\n=== SimpleStorage 功能演示 ===");
  
  // 读取初始数据
  const initialData = await simpleStorage.retrieveData();
  console.log("初始数据:", initialData);
  
  // 存储新数据
  const newData = "这是从 Sepolia 测试网更新的数据!";
  console.log("存储新数据:", newData);
  const storeTx = await simpleStorage.storeData(newData);
  await storeTx.wait();
  console.log("数据存储成功，交易哈希:", storeTx.hash);
  
  // 读取更新后的数据
  const updatedData = await simpleStorage.retrieveData();
  console.log("更新后的数据:", updatedData);
  
  // 获取合约信息
  const [contractAddr, data, owner] = await simpleStorage.getContractInfo();
  console.log("合约信息:");
  console.log("  合约地址:", contractAddr);
  console.log("  当前数据:", data);
  console.log("  所有者:", owner);
  
  // 获取区块信息
  const [blockNum, timestamp, blockHash] = await simpleStorage.getBlockInfo();
  console.log("区块信息:");
  console.log("  区块号:", blockNum.toString());
  console.log("  时间戳:", timestamp.toString());
  console.log("  区块哈希:", blockHash);
  
  // 部署 MyToken 合约
  console.log("\n=== 部署 MyToken 合约 ===");
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(deployer.address);
  await myToken.waitForDeployment();
  const myTokenAddress = await myToken.getAddress();
  console.log("MyToken 合约地址:", myTokenAddress);
  
  // 演示 MyToken 功能
  console.log("\n=== MyToken 功能演示 ===");
  
  // 获取代币信息
  const tokenName = await myToken.name();
  const tokenSymbol = await myToken.symbol();
  const totalSupply = await myToken.totalSupply();
  const ownerBalance = await myToken.balanceOf(deployer.address);
  
  console.log("代币信息:");
  console.log("  名称:", tokenName);
  console.log("  符号:", tokenSymbol);
  console.log("  总供应量:", ethers.formatEther(totalSupply));
  console.log("  所有者余额:", ethers.formatEther(ownerBalance));
  
  // 转账演示
  const transferAmount = ethers.parseEther("1000");
  console.log(`\n转账 ${ethers.formatEther(transferAmount)} MTK 到地址: ${deployer.address}`);
  const transferTx = await myToken.transfer(deployer.address, transferAmount);
  await transferTx.wait();
  console.log("转账成功，交易哈希:", transferTx.hash);
  
  // 铸造新代币
  const mintAmount = ethers.parseEther("5000");
  console.log(`\n铸造 ${ethers.formatEther(mintAmount)} MTK`);
  const mintTx = await myToken.mint(deployer.address, mintAmount);
  await mintTx.wait();
  console.log("铸造成功，交易哈希:", mintTx.hash);
  
  // 销毁代币
  const burnAmount = ethers.parseEther("100");
  console.log(`\n销毁 ${ethers.formatEther(burnAmount)} MTK`);
  const burnTx = await myToken.burn(burnAmount);
  await burnTx.wait();
  console.log("销毁成功，交易哈希:", burnTx.hash);
  
  // 获取最终统计
  const [finalTotalSupply, finalBalance] = await myToken.getTokenStats();
  console.log("\n最终统计:");
  console.log("  总供应量:", ethers.formatEther(finalTotalSupply));
  console.log("  当前余额:", ethers.formatEther(finalBalance));
  
  console.log("\n=== 演示完成 ===");
  console.log("合约地址:");
  console.log("  SimpleStorage:", simpleStorageAddress);
  console.log("  MyToken:", myTokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("交互失败:", error);
    process.exit(1);
  });

