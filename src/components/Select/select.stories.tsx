import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Select from './index';
import { JSX } from 'react/jsx-runtime';
import { SelectProps } from './select';

export default {
  title: 'Select 选择器',
  component: Select,
  id: 'Select',
  subcomponents: { 'Option': Select.Option },
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Select>;

export const DefaultSelect = (args: JSX.IntrinsicAttributes & SelectProps) => (
  <Select {...args} placeholder="请选择">
    <Select.Option value="better1" />
    <Select.Option value="better2" />
    <Select.Option value="better3" />
    <Select.Option value="better4 disabled" disabled />
    <Select.Option value="better5" />
  </Select>
);
DefaultSelect.storyName = '默认的选择器';

export const MultipleSelect = (args: JSX.IntrinsicAttributes & SelectProps) => (
  <Select {...args} placeholder="请选择" multiple>
    <Select.Option value="better1" />
    <Select.Option value="better2" />
    <Select.Option value="better3" />
    <Select.Option value="better4" />
    <Select.Option value="better5" />
  </Select>
);
MultipleSelect.storyName = '支持多选';

export const DisabledSelect = (args: JSX.IntrinsicAttributes & SelectProps) => (
  <Select {...args} placeholder="请选择" disabled>
    <Select.Option value="better1" />
    <Select.Option value="better2" />
    <Select.Option value="better3" />
  </Select>  
);
DisabledSelect.storyName = '禁用状态';