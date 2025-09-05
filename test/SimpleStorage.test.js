const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy(owner.address);
  });

  describe("部署", function () {
    it("应该正确设置所有者", async function () {
      expect(await simpleStorage.owner()).to.equal(owner.address);
    });

    it("应该设置初始数据", async function () {
      expect(await simpleStorage.retrieveData()).to.equal("Hello, Sepolia!");
    });
  });

  describe("存储数据", function () {
    it("所有者应该能够存储数据", async function () {
      const newData = "新的数据";
      const tx = await simpleStorage.storeData(newData);
      await expect(tx)
        .to.emit(simpleStorage, "DataStored")
        .withArgs(owner.address, newData, await time());
      
      expect(await simpleStorage.retrieveData()).to.equal(newData);
    });

    it("非所有者不应该能够存储数据", async function () {
      await expect(
        simpleStorage.connect(addr1).storeData("未授权数据")
      ).to.be.revertedWithCustomError(simpleStorage, "OwnableUnauthorizedAccount");
    });
  });

  describe("检索数据", function () {
    it("任何人都应该能够检索数据", async function () {
      const data = await simpleStorage.connect(addr1).retrieveData();
      expect(data).to.equal("Hello, Sepolia!");
    });
  });

  describe("合约信息", function () {
    it("应该返回正确的合约信息", async function () {
      const [contractAddress, data, contractOwner] = await simpleStorage.getContractInfo();
      expect(contractAddress).to.equal(await simpleStorage.getAddress());
      expect(data).to.equal("Hello, Sepolia!");
      expect(contractOwner).to.equal(owner.address);
    });
  });

  describe("区块信息", function () {
    it("应该返回当前区块信息", async function () {
      const [blockNumber, timestamp, blockHash] = await simpleStorage.getBlockInfo();
      expect(blockNumber).to.be.gt(0);
      expect(timestamp).to.be.gt(0);
      expect(blockHash).to.not.equal(ethers.ZeroHash);
    });
  });
});

// 辅助函数：获取当前时间戳
async function time() {
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  return block.timestamp;
}
