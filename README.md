## 引言

欢迎来到 betterui 组件库，这是一个基于 React 的组件库，用于快速搭建页面。

[点击查看组件库文档](https://coder-xiaozhuang.github.io/betterui)


## 快速上手
node版本推荐：14.x.x

### 如何安装

#### NPM
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

~~~javascript
npm install @zhuangjiaqing/betterui --save
~~~

#### CDN
目前可以通过 `unpkg.com/@zhuangjiaqing/betterui` 获取到最新版本的资源，在页面上引入 css 和 js 文件即可开始使用。

~~~javascript
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/@zhuangjiaqing/betterui@1.0.3/dist/index.css" />

<!-- 引入组件库 -->
<script src="https://unpkg.com/@zhuangjiaqing/betterui@1.0.3/dist/index.umd.js"></script>
~~~
> 注意：我们建议使用 CDN 引入 betterui 的用户在链接地址上锁定版本，以免将来 betterui 升级时受到非兼容性更新的影响。锁定版本的方法请查看 unpkg.com。

### 如何使用

#### NPM

~~~javascript
import React from 'react';
import '@zhuangjiaqing/betterui/dist/index.css';
import { BetterButton } from '@zhuangjiaqing/betterui';

function App() {
  return (
    <div>
      <BetterButton btnType='primary'>Hello World</BetterButton>
    </div>
  );
}

export default App;
~~~
好了，现在你应该能看到页面上已经有了 betterui 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。[示例源码](https://github.com/Coder-XiaoZhuang/betterui_test_app/blob/main/src/App.tsx)

#### CDN

通过 CDN 的方式我们可以很容易地使用 betterui 写出一个 Hello world 页面。
[示例源码](https://github.com/Coder-XiaoZhuang/betterui/blob/main/test.html)
[在线演示](https://unpkg.com/@zhuangjiaqing/betterui@1.0.3/test.html)


### 一些本地开发命令

~~~bash
//启动本地环境
npm run storybook

//跑单元测试
npm run test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~