import React  from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterProgress from './progress';

export default { 
  title: 'Progress 进度条',
  id: 'BetterProgress',
  component: BetterProgress,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof BetterProgress>;

const Template: ComponentStory<typeof BetterProgress> = (args) => <BetterProgress { ...args } />;

export const DefaultProgress = Template.bind({});
DefaultProgress.args = {
  percent: 50,
};
DefaultProgress.storyName = '默认的进度条';