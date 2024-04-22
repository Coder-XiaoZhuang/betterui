import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterMenu from './index';

const menuMeta: ComponentMeta<typeof BetterMenu> = {
  title: 'Menu 菜单',
  id: 'BetterMenu',
  component: BetterMenu,
  subcomponents: { 
    'BetterMenu.SubMenu': BetterMenu.SubMenu, 
    'BetterMenu.Item': BetterMenu.Item,
  },
  args: {
    defaultIndex: '1',
  },
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};
export default menuMeta;

const Template: ComponentStory<typeof BetterMenu> = (args) => (
  <BetterMenu { ...args } >
    <BetterMenu.Item>
      选项一
    </BetterMenu.Item>
    <BetterMenu.Item>
      选项二
    </BetterMenu.Item>
    <BetterMenu.Item disabled>
      选项三
    </BetterMenu.Item> 
    <BetterMenu.SubMenu title="选项四">
      <BetterMenu.Item>
        下拉选项一
      </BetterMenu.Item>
      <BetterMenu.Item>
        下拉选项二
      </BetterMenu.Item>    
    </BetterMenu.SubMenu>
  </BetterMenu>
);

export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = "默认的菜单";

export const ClickMenu = Template.bind({});
ClickMenu.args = {
  mode: 'horizontal',
  defaultIndex: '0',
};
ClickMenu.storyName = "横向的菜单";

export const OpenedMenu = Template.bind({});
OpenedMenu.args = {
  mode: 'vertical',
  defaultIndex: '0',
  defaultOpenSubMenus: ['3'],
};
OpenedMenu.storyName = "纵向的菜单";