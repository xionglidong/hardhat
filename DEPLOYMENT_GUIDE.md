# Sepolia 部署指南

## 准备工作

### 1. 获取 Sepolia ETH
在部署到 Sepolia 测试网之前，您需要一些测试用的 ETH：

- [Sepolia Faucet](https://sepoliafaucet.com/) - 官方水龙头
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia) - Infura 水龙头
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/) - Alchemy 水龙头

### 2. 获取 RPC URL
您需要 Sepolia 网络的 RPC URL：

**Infura:**
1. 注册 [Infura](https://infura.io/)
2. 创建新项目
3. 获取 Sepolia 网络的 RPC URL: `https://sepolia.infura.io/v3/YOUR-PROJECT-ID`

**Alchemy:**
1. 注册 [Alchemy](https://alchemy.com/)
2. 创建新应用
3. 获取 Sepolia 网络的 RPC URL: `https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY`

### 3. 获取 Etherscan API Key
用于验证合约：

1. 注册 [Etherscan](https://etherscan.io/)
2. 创建 API Key
3. 在 [Sepolia Etherscan](https://sepolia.etherscan.io/) 上使用

## 环境配置

1. 复制环境变量文件：
```bash
cp env.example .env
```

2. 编辑 `.env` 文件：
```env
# 您的私钥（不要包含0x前缀）
PRIVATE_KEY=your_private_key_here

# Sepolia RPC URL
SEPOLIA_URL=https://sepolia.infura.io/v3/your_project_id

# Etherscan API Key
ETHERSCAN_API_KEY=your_etherscan_api_key

# 是否启用Gas报告
REPORT_GAS=true
```

## 部署步骤

### 1. 编译合约
```bash
npm run compile
```

### 2. 运行测试（可选）
```bash
npm run test
```

### 3. 部署到 Sepolia
```bash
npm run deploy:sepolia
```

部署完成后，您会看到类似这样的输出：
```
开始部署合约到Sepolia测试网...
部署者地址: 0x...
部署者余额: 0.5 ETH

部署 SimpleStorage 合约...
SimpleStorage 合约地址: 0x...

部署 MyToken 合约...
MyToken 合约地址: 0x...

验证部署...
SimpleStorage 初始数据: Hello, Sepolia!
MyToken 信息:
  名称: MyToken
  符号: MTK
  总供应量: 1000000.0

部署完成!
合约地址:
  SimpleStorage: 0x...
  MyToken: 0x...

部署信息已保存到 deployment-info.json
```

## 验证合约

部署后，您可以在 Sepolia Etherscan 上验证合约：

### 验证 SimpleStorage 合约
```bash
npx hardhat verify --network sepolia 0x<合约地址> 0x<部署者地址>
```

### 验证 MyToken 合约
```bash
npx hardhat verify --network sepolia 0x<合约地址> 0x<部署者地址>
```

## 与合约交互

### 使用 Hardhat Console
```bash
npx hardhat console --network sepolia
```

在控制台中：
```javascript
// 获取合约实例
const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
const simpleStorage = await SimpleStorage.attach("0x<合约地址>");

// 读取数据
const data = await simpleStorage.retrieveData();
console.log("存储的数据:", data);

// 存储新数据（需要是所有者）
const tx = await simpleStorage.storeData("新数据");
await tx.wait();
```

### 使用脚本
```bash
npx hardhat run scripts/interact.js --network sepolia
```

## 故障排除

### 常见错误

1. **"insufficient funds"**
   - 确保您的账户有足够的 Sepolia ETH

2. **"nonce too low"**
   - 等待几分钟后重试，或增加 nonce

3. **"gas estimation failed"**
   - 检查合约代码是否有错误
   - 确保 RPC URL 正确

4. **"invalid project id"**
   - 检查 Infura/Alchemy 项目 ID 是否正确

### 获取帮助

- 查看 [Hardhat 文档](https://hardhat.org/docs)
- 检查 [Sepolia Etherscan](https://sepolia.etherscan.io/)
- 查看部署日志和错误信息

## 安全注意事项

1. **私钥安全**
   - 永远不要将私钥提交到 Git
   - 使用环境变量存储敏感信息
   - 考虑使用硬件钱包

2. **测试网络**
   - Sepolia 是测试网络，交易不需要真实费用
   - 在部署到主网之前充分测试

3. **合约安全**
   - 进行安全审计
   - 使用经过验证的库（如 OpenZeppelin）
   - 测试所有功能

## 下一步

部署成功后，您可以：

1. 在 Sepolia Etherscan 上查看合约
2. 使用 Web3 库（如 ethers.js）构建前端应用
3. 集成到您的 DApp 中
4. 部署到其他测试网络（如 Goerli）
5. 最终部署到以太坊主网

