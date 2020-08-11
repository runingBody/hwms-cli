# HWMS-CLI

## 功能

    1. 实现项目快捷交付、版本分支的快捷管理

    2. 指定打包编译哪些子应用,逗号分隔多个应用

## 多子应用集成于同一个项目

## 适用范围

> 单个项目包含一个或者多个子应用(请勿跨项目使用，建议一个项目clone一次)

> 整个项目使用 hips-ui 作为前端展示框架 (若需使用其他ui组件库，请认真考虑)

> node版本最好是10以上

## 项目初始化

```
yarn install
```

## 项目本地启动、运行
```
yarn serve
```

## 根目录文档结构
| 目录 | 描述 |
|--|--|
| bin | 可执行文件 |
| commands | 命令 |
| commands/index | 命令初始化Loader加载 |
| commands/actions | 命令执行成功回调 |
| commands/runners | git操作相关 |
| lib/ui | 提示信息UI、样式 |
| package.json | 配置文件 |

## 已有命令解释


1. clone   // 克隆需求版本源码

2. build   // 指定打包编译哪些子应用,逗号分隔多个应用

```

// 使用示例:

yarn build             // 交互式选择打包子应用

yarn build pack1,pack2 // 打包子应用pack1、子应用pack2

yarn build --all       // 打包所有子应用

```

3. generate:accept-goods // 生成新的项目文件[子应用模版]- 待扩展

## NPM 推送

```
1. npm login -- xxx

2. npm publish
```

