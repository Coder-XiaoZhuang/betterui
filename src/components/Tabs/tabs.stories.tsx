import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterTabs from './tabs';
import BetterTabItem from './tabItem';
import BetterIcon from '../Icon';

export default {
  title: 'Tabs 选项卡',
  id: 'BetterTabs',
  component: BetterTabs,
  subcomponents: { 
    'BetterTabItem': BetterTabItem,
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
    <BetterTabItem label="选项卡一">选项卡一</BetterTabItem>
    <BetterTabItem label="选项卡二">选项卡二</BetterTabItem>
    <BetterTabItem label="选项卡三">选项卡三</BetterTabItem>
  </BetterTabs>
);
DefaultTabs.storyName = '标准版';

export const CardTabs: ComponentStory<typeof BetterTabs> = (args) => (
  <BetterTabs { ...args } type="card">
    <BetterTabItem label='选项卡一'>选项卡一</BetterTabItem>
    <BetterTabItem label="选项卡二">选项卡二</BetterTabItem>
    <BetterTabItem label="选项卡三" disabled>选项卡三</BetterTabItem>
  </BetterTabs> 
);
CardTabs.storyName = '卡片选项卡';

export const CustomTabs: ComponentStory<typeof BetterTabs> = (args) => (
  <BetterTabs { ...args } type="card">
    <BetterTabItem label={ <><BetterIcon icon="check-circle" />选项卡一</> }>选项卡一</BetterTabItem>
    <BetterTabItem label="选项卡二">选项卡二</BetterTabItem>
  </BetterTabs> 
);
CustomTabs.storyName = '自定义选项卡';
