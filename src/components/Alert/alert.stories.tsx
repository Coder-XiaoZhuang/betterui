import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterAlert from './alert';

export default { 
  title: 'Alert 警告提示',
  id: 'BetterAlert',
  component: BetterAlert,
} as ComponentMeta<typeof BetterAlert>;

const Template: ComponentStory<typeof BetterAlert> = (args) => <BetterAlert { ...args } />;

export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
  title: '消息提示文案',
};
DefaultAlert.storyName = '基本版';

export const StylesAlert = () => {
  return (
    <>
      <BetterAlert type="default" title="消息提示的文案"></BetterAlert>
      <BetterAlert type="success" title="成功提示的文案"></BetterAlert>
      <BetterAlert type="danger" title="错误提示的文案"></BetterAlert>
      <BetterAlert type="warning" title="警告提示的文案" closable={ false }></BetterAlert>
    </>
  );
};
StylesAlert.storyName = '标准版';

export const DescAlert = Template.bind({});
DescAlert.args = {
  title: '带辅助性文字介绍',
  description: '你好，我是白特，是一名00后程序员，我喜欢编程，喜欢学习，喜欢分享...',
};
DescAlert.storyName = '带有辅助性文字介绍';

