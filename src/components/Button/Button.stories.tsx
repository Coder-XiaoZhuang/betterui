import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterButton from './button';

export default {
  title: 'Button 按钮',
  id: 'BetterButton',
  component: BetterButton,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof BetterButton>;

const Template: ComponentStory<typeof BetterButton> = (args) => <BetterButton {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: 'Default Button',
};
DefaultButton.storyName = '默认的按钮';

export const ButtonWithSize = () => (
  <>
    <BetterButton size="lg"> Large Button </BetterButton>
    <BetterButton size="sm"> Small Button </BetterButton>
  </>
);
ButtonWithSize.storyName = '不同尺寸的按钮';

export const ButtonWithType = () => (
  <>
    <BetterButton btnType="primary"> Primary Button </BetterButton>
    <BetterButton btnType="danger"> Danger Button </BetterButton>
    <BetterButton btnType="link" href="https://google.com"> Link Button </BetterButton>
  </>
);
ButtonWithType.storyName = '不同类型的按钮';