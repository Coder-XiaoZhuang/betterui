import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterMenu from './menu';
import BetterSubMenu from './subMenu';
import BetterMenuItem from './menuItem';

const menuMeta: ComponentMeta<typeof BetterMenu> = {
  title: 'Menu 菜单',
  id: 'BetterMenu',
  component: BetterMenu,
  subcomponents: { 
    'BetterSubMenu': BetterSubMenu, 
    'BetterMenuItem': BetterMenuItem,
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
    <BetterMenuItem>
      选项一
    </BetterMenuItem>
    <BetterMenuItem>
      选项二
    </BetterMenuItem>
    <BetterMenuItem disabled>
      选项三
    </BetterMenuItem> 
    <BetterSubMenu title="选项四">
      <BetterMenuItem>
        下拉选项一
      </BetterMenuItem>
      <BetterMenuItem>
        下拉选项二
      </BetterMenuItem>    
    </BetterSubMenu>
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