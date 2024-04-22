import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterTabs from './index';
import BetterIcon from '../Icon';

export default {
  title: 'Tabs 选项卡',
  id: 'BetterTabs',
  component: BetterTabs,
  subcomponents: { 
    'BetterTabs.Item': BetterTabs.Item,
  },
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof BetterTabs>;

export const DefaultTabs: ComponentStory<typeof BetterTabs> = (args) => (
  <BetterTabs { ...args }>
    <BetterTabs.Item label="选项卡一">选项卡一</BetterTabs.Item>
    <BetterTabs.Item label="选项卡二">选项卡二</BetterTabs.Item>
    <BetterTabs.Item label="选项卡三">选项卡三</BetterTabs.Item>
  </BetterTabs>
);
DefaultTabs.storyName = '标准版';

export const CardTabs: ComponentStory<typeof BetterTabs> = (args) => (
  <BetterTabs { ...args } type="card">
    <BetterTabs.Item label='选项卡一'>选项卡一</BetterTabs.Item>
    <BetterTabs.Item label="选项卡二">选项卡二</BetterTabs.Item>
    <BetterTabs.Item label="选项卡三" disabled>选项卡三</BetterTabs.Item>
  </BetterTabs> 
);
CardTabs.storyName = '卡片选项卡';

export const CustomTabs: ComponentStory<typeof BetterTabs> = (args) => (
  <BetterTabs { ...args } type="card">
    <BetterTabs.Item label={ <><BetterIcon icon="check-circle" />选项卡一</> }>选项卡一</BetterTabs.Item>
    <BetterTabs.Item label="选项卡二">选项卡二</BetterTabs.Item>
  </BetterTabs> 
);
CustomTabs.storyName = '自定义选项卡';
