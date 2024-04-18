import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterInput from './input';

export default {
  title: 'Input 输入框',
  id: 'BetterInput',
  component: BetterInput,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof BetterInput>;

const Template: ComponentStory<typeof BetterInput> = (args) => <BetterInput { ...args } />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  placeholder: 'default Input',
};
DefaultInput.storyName = '默认的输入框';

export const DisabledInput = () => (
  <BetterInput
    placeholder="disabled Input"
    disabled
  />
);
DisabledInput.storyName = '被禁用的输入框';

export const InputWithIcon = () => {
  return (
    <>
      <BetterInput
        placeholder="Input with icon"
        icon="search"
      />
    </>
  );

}
InputWithIcon.storyName = '带图标的输入框';

export const InputWithSize = () => (
  <>
    <BetterInput
      placeholder="large size"
      size="lg"
    />
    <BetterInput
      placeholder="small size"
      size="sm"
    />
  </>
);
InputWithSize.storyName = '不同尺寸的输入框';

export const InputWithPand = () => (
  <>
    <BetterInput
      defaultValue="prepend text"
      prepend="https://"
    />
    <BetterInput
      defaultValue="append text"
      append=".com"
    />
  </>
);
InputWithPand.storyName = '带前后缀的输入框';

