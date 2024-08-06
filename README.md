# 时间限制交易 Aspect

### 名称：
可配置时间限制交易 Aspect

### 摘要：
这个 Aspect 在 Artela 网络上实现了一个可配置的基于时间的智能合约交互限制机制。它允许区块链应用将交易或其他合约交互限制在特定的星期几和时间范围内，增强了对交易何时可以发生的控制。

## 团队成员和角色
团队成员1：【 ymjrcc - 核心开发 】

## 问题陈述和解决方案概述

### 问题
在传统金融市场中，交易通常限制在特定时间（例如，股票市场交易时间）。然而，区块链网络全天候运行，这可能导致：
- 在非工作时间监控减少时，容易受到攻击的风险增加。
- 与传统营业时间不一致，可能会给集成区块链解决方案的企业带来问题。
- 缺乏对何时可以在智能合约上执行某些操作的控制。

### 解决方案
这个可配置时间限制交易 Aspect 通过以下方式解决这些问题：
- 允许合约部署者设置允许交互的特定日期和时间范围。
- 自动拒绝超出指定时间窗口的交易。
- 提供灵活性，可以调整允许的交易时间，而无需修改底层智能合约代码。

## 设计过程

### 需求分析
我们收集和识别了区块链应用中对基于时间的交易限制的需求，有些金融交易可能需要和传统金融交易那样在固定时间开放。

### 功能设计
我们的 Aspect 需要满足以下几点功能：
- 可以配置和读取具体的日期和时间范围参数。
- 在允许交易之前检查当前时间是否符合这些参数。
- 拒绝超出允许时间窗口的交易。

### 实现
我们使用 Artela 的面向方面编程模型开发了这个 Aspect，利用 IPreContractCallJP 接口在交易到达智能合约之前拦截它们。

## 对 Artela 生态系统的价值
这个 Aspect 为 Artela 生态系统带来了几个好处：
- 增强控制：它为开发者和企业提供了对智能合约何时可以被交互的精细控制，满足了一些特定的需求。
- 提高安全性：通过将操作限制在特定时间，它减少了非工作时间的攻击面，提高了整体安全性。
- 灵活性：Aspect 的可配置性允许轻松调整操作时间，无需修改智能合约，展示了 Artela 的适应性。

## 如何使用
`aspect/index.ts` 文件实现了上述的全部功能。使用前设定好时间参数，将其配置到项目中即可。

参考 [官方文档](https://docs.artela.network/main/Aspect-Programming)
