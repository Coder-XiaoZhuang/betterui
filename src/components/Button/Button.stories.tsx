import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './button';

export default {
  title: 'Button 按钮',
  id: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: 'Default Button',
};
DefaultButton.storyName = '默认的按钮';

export const ButtonWithSize = () => (
  <>
    <Button size="lg"> Large Button </Button>
    <Button size="sm"> Small Button </Button>
  </>
);
ButtonWithSize.storyName = '不同尺寸的按钮';

export const ButtonWithType = () => (
  <>
    <Button btnType="primary"> Primary Button </Button>
    <Button btnType="danger"> Danger Button </Button>
    <Button btnType="link" href="https://google.com"> Link Button </Button>
  </>
);
ButtonWithType.storyName = '不同类型的按钮';