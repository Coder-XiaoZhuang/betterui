import React  from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Progress } from './progress';

export default { 
  title: 'Progress 进度条',
  id: 'Progress',
  component: Progress,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => <Progress { ...args } />;

export const DefaultProgress = Template.bind({});
DefaultProgress.args = {
  percent: 50,
};
DefaultProgress.storyName = '默认的进度条';