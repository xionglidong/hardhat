const hre = require("hardhat");

async function main() {
  const ETHVault = await hre.ethers.getContractFactory("ETHVault");
  const vault = await ETHVault.deploy();

  await vault.waitForDeployment();

  console.log("ETHVault deployed to:", await vault.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
