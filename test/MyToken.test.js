const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let myToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(owner.address);
  });

  describe("部署", function () {
    it("应该正确设置所有者", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("应该设置正确的代币名称和符号", async function () {
      expect(await myToken.name()).to.equal("MyToken");
      expect(await myToken.symbol()).to.equal("MTK");
    });

    it("应该铸造初始供应量给所有者", async function () {
      const initialSupply = ethers.parseEther("1000000"); // 1,000,000 代币
      expect(await myToken.totalSupply()).to.equal(initialSupply);
      expect(await myToken.balanceOf(owner.address)).to.equal(initialSupply);
    });
  });

  describe("转账", function () {
    it("应该能够转账代币", async function () {
      const transferAmount = ethers.parseEther("1000");
      await myToken.transfer(addr1.address, transferAmount);
      
      expect(await myToken.balanceOf(addr1.address)).to.equal(transferAmount);
      expect(await myToken.balanceOf(owner.address)).to.equal(
        ethers.parseEther("999000")
      );
    });

    it("余额不足时应该失败", async function () {
      const tooMuch = ethers.parseEther("1000001");
      await expect(
        myToken.transfer(addr1.address, tooMuch)
      ).to.be.revertedWithCustomError(myToken, "ERC20InsufficientBalance");
    });
  });

  describe("铸造", function () {
    it("所有者应该能够铸造新代币", async function () {
      const mintAmount = ethers.parseEther("10000");
      const initialBalance = await myToken.balanceOf(addr1.address);
      
      await myToken.mint(addr1.address, mintAmount);
      
      expect(await myToken.balanceOf(addr1.address)).to.equal(
        initialBalance + mintAmount
      );
    });

    it("非所有者不应该能够铸造代币", async function () {
      await expect(
        myToken.connect(addr1).mint(addr2.address, ethers.parseEther("1000"))
      ).to.be.revertedWithCustomError(myToken, "OwnableUnauthorizedAccount");
    });
  });

  describe("销毁", function () {
    it("用户应该能够销毁自己的代币", async function () {
      const transferAmount = ethers.parseEther("1000");
      const burnAmount = ethers.parseEther("500");
      
      await myToken.transfer(addr1.address, transferAmount);
      await myToken.connect(addr1).burn(burnAmount);
      
      expect(await myToken.balanceOf(addr1.address)).to.equal(
        transferAmount - burnAmount
      );
    });
  });

  describe("统计信息", function () {
    it("应该返回正确的代币统计信息", async function () {
      const [totalSupply, userBalance] = await myToken.getTokenStats();
      expect(totalSupply).to.equal(ethers.parseEther("1000000"));
      expect(userBalance).to.equal(ethers.parseEther("1000000"));
    });
  });
});
