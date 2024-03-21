import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './input';

export default {
  title: 'Input 输入框',
  id: 'Input',
  component: Input,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input { ...args } />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  placeholder: 'default Input',
};
DefaultInput.storyName = '默认的输入框';

export const DisabledInput = () => (
  <Input
    placeholder="disabled Input"
    disabled
  />
);
DisabledInput.storyName = '被禁用的输入框';

export const InputWithIcon = () => {
  return (
    <>
      <Input
        placeholder="Input with icon"
        icon="search"
      />
    </>
  );

}
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

export const InputWithPand = () => (
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

InputWithPand.storyName = '带前后缀的输入框';

