import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome 首页', module)
  .add('安装', () => {
    return (
      <>
        <h4><strong>欢迎来到 betterui 组件库</strong></h4>
        <p>这是一个基于 React 的组件库，用于快速搭建页面</p>
        <p><strong>安装试试</strong></p>
        <code>
          npm install @zhuangjiaqing/betterui --save
        </code>
      </>
    );
  }, { info : { disable: true } });
