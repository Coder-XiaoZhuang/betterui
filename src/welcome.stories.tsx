import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome 首页', module)
  .add('安装', () => {
    return (
      <>
        <h3><strong>欢迎来到 betterui 组件库</strong></h3>
        <p>这是一个基于 React 的组件库，用于快速搭建页面。</p>
        <h4><strong>安装</strong></h4>
        <h5>npm 安装</h5>
        <p>推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。</p>
        <code>
          npm install @zhuangjiaqing/betterui --save
        </code>

        <br /><br />

        <h5>CDN</h5>
        <p>目前可以通过 unpkg.com/@zhuangjiaqing/betterui 获取到最新版本的资源，在页面上引入 css 和 js 文件即可开始使用。</p>
        <code>
          {'<'}!-- 引入样式 --{'>'}
          <p>&lt;link rel="stylesheet" href="https://unpkg.com/@zhuangjiaqing/betterui@1.0.3/dist/index.css" /&gt;</p>
          {'<'}!-- 引入组件库 --{'>'}
          <p>&lt;script src="https://unpkg.com/@zhuangjiaqing/betterui@1.0.3/dist/index.umd.js"&gt;&lt;/script&gt;</p>
        </code>
        <p>注意：我们建议使用 CDN 引入 betterui 的用户在链接地址上锁定版本，以免将来 betterui 升级时受到非兼容性更新的影响。锁定版本的方法请查看 <a href="https://unpkg.com/">unpkg.com</a>。</p>
      </>
    );
  }, { info : { disable: true } })
  .add('快速上手', () => {
    return (
      <>
        <p>这里我们提供两个基础的例子来快速上手 betterui。</p>
        <h4>CDN</h4>
        <p>
          通过 CDN 的方式我们可以很容易地使用 betterui 写出一个 Hello world 页面。
          <a href="https://github.com/Coder-XiaoZhuang/betterui/blob/main/test.html">示例源码</a>
          &nbsp;
          <a href="https://unpkg.com/@zhuangjiaqing/betterui@1.0.3/test.html">在线演示</a>
        </p>
        <h4>npm安装</h4>
        <p>
          <code>
            npm install @zhuangjiaqing/betterui --save
          </code>
        </p>
        <p>
          修改 src/App.tsx，引入 betterui 的按钮组件。
        </p>
        <p>
          <code>
            <p>import React from 'react';</p>
            <p>import '@zhuangjiaqing/betterui/dist/index.css';</p>
            <p>import { '{ BetterButton }' } from '@zhuangjiaqing/betterui';</p>
            <p>
              {`function App() {
                return (
                  <div className="App">
                    <BetterButton btnType='primary'>Hello World</BetterButton>
                  </div>
                );
              }`}
            </p>
            <p>export default App;</p>
          </code>
        </p>
        
        <p>
          好了，现在你应该能看到页面上已经有了 betterui 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。
          <a href="https://github.com/Coder-XiaoZhuang/betterui_test_app/blob/main/src/App.tsx">示例源码</a>
        </p>
      </>
    );
  }, { info : { disable: true } });
