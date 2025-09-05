# Sepolia 智能合约项目

这是一个使用 Hardhat 框架开发的智能合约项目，可以部署到 Sepolia 测试网络。

## 项目结构

```
├── contracts/           # 智能合约
│   ├── SimpleStorage.sol    # 简单存储合约
│   └── Token.sol           # ERC20 代币合约
├── scripts/            # 部署脚本
│   └── deploy.js
├── test/              # 测试文件
│   ├── SimpleStorage.test.js
│   └── MyToken.test.js
├── hardhat.config.js  # Hardhat 配置
├── package.json       # 项目依赖
└── README.md         # 项目说明
```

## 安装依赖

```bash
npm install
```

## 环境配置

1. 复制环境变量示例文件：
```bash
cp env.example .env
```

2. 编辑 `.env` 文件，填入以下信息：
   - `PRIVATE_KEY`: 您的私钥（不要包含0x前缀）
   - `SEPOLIA_URL`: Sepolia RPC URL（如 Infura、Alchemy）
   - `ETHERSCAN_API_KEY`: Etherscan API Key（用于验证合约）

## 编译合约

```bash
npm run compile
```

## 运行测试

```bash
npm run test
```

## 部署到 Sepolia

确保您已经：
1. 配置了 `.env` 文件
2. 有足够的 Sepolia ETH（可以从水龙头获取）

然后运行：

```bash
npm run deploy:sepolia
```

## 合约功能

### SimpleStorage 合约
- 存储和检索字符串数据
- 只有所有者可以更新数据
- 任何人都可以读取数据
- 包含事件记录

### MyToken 合约
- 标准 ERC20 代币
- 初始供应量：1,000,000 MTK
- 所有者可以铸造新代币
- 用户可以销毁自己的代币

## 获取 Sepolia ETH

您可以从以下水龙头获取免费的 Sepolia ETH：
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)

## 验证合约

部署后，您可以使用 Etherscan 验证合约：

```bash
npx hardhat verify --network sepolia <合约地址> <构造函数参数>
```

## 常用命令

```bash
# 编译合约
npm run compile

# 运行测试
npm run test

# 启动本地节点
npm run node

# 部署到 Sepolia
npm run deploy:sepolia

# 清理编译文件
npm run clean
```

## 注意事项

1. **私钥安全**: 永远不要将私钥提交到版本控制系统
2. **测试网络**: Sepolia 是测试网络，交易不需要真实费用
3. **合约验证**: 建议在 Etherscan 上验证您的合约以便用户查看源代码
4. **Gas 费用**: 虽然 Sepolia 是测试网络，但仍需要少量 ETH 支付 Gas 费用

## 故障排除

如果遇到问题：

1. 检查 `.env` 文件配置是否正确
2. 确保有足够的 Sepolia ETH
3. 检查网络连接是否正常
4. 查看 Hardhat 错误日志获取详细信息

