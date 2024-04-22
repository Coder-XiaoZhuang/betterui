import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { JSX } from 'react/jsx-runtime';
import { SelectProps } from './select';
import BetterSelect from './index';

const selectMeta: ComponentMeta<typeof BetterSelect> = {
  title: 'Select 选择器',
  id: 'BetterSelect',
  component: BetterSelect,
  subcomponents: { 
    'Option': BetterSelect.Option,
  },
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};
export default selectMeta;

export const DefaultSelect = (args: JSX.IntrinsicAttributes & SelectProps) => (
  <BetterSelect {...args} placeholder="请选择">
    <BetterSelect.Option value="better1" />
    <BetterSelect.Option value="better2" />
    <BetterSelect.Option value="better3" />
    <BetterSelect.Option value="better4 disabled" disabled />
    <BetterSelect.Option value="better5" />
  </BetterSelect>
);
DefaultSelect.storyName = '默认的选择器';

export const MultipleSelect = (args: JSX.IntrinsicAttributes & SelectProps) => (
  <BetterSelect {...args} placeholder="请选择" multiple>
    <BetterSelect.Option value="better1" />
    <BetterSelect.Option value="better2" />
    <BetterSelect.Option value="better3" />
    <BetterSelect.Option value="better4" />
    <BetterSelect.Option value="better5" />
  </BetterSelect>
);
MultipleSelect.storyName = '支持多选';

export const DisabledSelect = (args: JSX.IntrinsicAttributes & SelectProps) => (
  <BetterSelect {...args} placeholder="请选择" disabled>
    <BetterSelect.Option value="better1" />
    <BetterSelect.Option value="better2" />
    <BetterSelect.Option value="better3" />
  </BetterSelect>  
);
DisabledSelect.storyName = '禁用状态';