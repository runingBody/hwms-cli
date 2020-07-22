# HWMS-CLI

## 功能

    实现项目快捷交付、版本分支的快捷管理

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

```

clone   // 克隆需求版本源码

generate:accept-goods // 生成新的项目文件[子应用模版]- 待扩展

```

