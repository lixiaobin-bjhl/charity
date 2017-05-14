## 关于charity

charity是基于Node.js & MongoDB & Vue领先的轻量级CMS(内容管理系统)

![QQ交流群](http://omh2h1x76.bkt.clouddn.com/charity%E7%BE%A4%E4%BA%8C%E7%BB%B4%E7%A0%81.png)
## 启动

```bash
$ npm install
$ npm test
```

publish your framework to npm, then change app's dependencies:

```js
// {app_root}/index.js
require('charity').startCluster({
  baseDir: __dirname,
  // port: 7001, // default to 7001
});

```
## 错误码规范

| 位数 | 说明 | 备注 |
| --- | --- | --- |
| 前3位 | 业务模块id（具体id见config/modules配置文件） | 从左开始数，系统级别id为0，故看到小于4位的错误码，都是系统别级的错误 |

### 全局错误码说明
| 错误码 | 说明 | 备注 |
| --- | --- | --- |
| 1 | 没有访问权限   |
| 2 | 访问模块不存在   |

## 权限说明

| request method | 权限码 | 备注 |
| :-: | :-: | :-: |
| get | 1 | 查看 |
| post | 2 | 添加  |
| update | 3 | 更新 |
| delete | 4 | 删除  |




## 问题

提交问题 [点击这里](https://github.com/lixiaobin-bjhl/charity/issues)


## 联系我们

QQ: 516908542
email: lixiaobin8878@gmail.com

