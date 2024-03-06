import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './input';

export default {
  title: 'Input 输入框',
  id: 'Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  placeholder: 'default Input',
};
DefaultInput.storyName = '默认的输入框';

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  placeholder: 'disabled Input',
  disabled: true,
};
DisabledInput.storyName = '被禁用的输入框';

export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  placeholder: 'Input with icon',
  icon: 'search',
};
InputWithIcon.storyName = '带图标的输入框';

export const InputWithSize = () => (
  <>
    <Input
      placeholder="large size"
      size="lg"
    />
    <Input
      placeholder="small size"
      size="sm"
    />
  </>
);
InputWithSize.storyName = '不同尺寸的输入框';

export const EPandInput = () => (
  <>
    <Input
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      defaultValue="append text"
      append=".com"
    />
  </>
);

EPandInput.storyName = '带前后缀的输入框';

