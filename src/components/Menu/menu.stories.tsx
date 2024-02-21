import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Menu from './menu';
import SubMenu from './subMenu';
import MenuItem from './menuItem';

const menuMeta: ComponentMeta<typeof Menu> = {
  title: 'Menu 菜单',
  id: 'Menu',
  component: Menu,
  subcomponents: { 
    'SubMenu': SubMenu, 
    'MenuItem': MenuItem,
  },
  args: {
    defaultIndex: '1',
  },
};
export default menuMeta;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu { ...args } >
    <MenuItem>
      选项一
    </MenuItem>
    <MenuItem>
      选项二
    </MenuItem>
    <MenuItem disabled>
      选项三
    </MenuItem> 
    <SubMenu title="选项四">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>    
    </SubMenu>
  </Menu>
);

export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = "默认Menu";

export const ClickMenu = Template.bind({});
ClickMenu.args = {
  mode: 'horizontal',
  defaultIndex: '0',
};
ClickMenu.storyName = "横向Menu";

export const OpenedMenu = Template.bind({});
OpenedMenu.args = {
  mode: 'vertical',
  defaultIndex: '0',
  defaultOpenSubMenus: ['3'],
};
OpenedMenu.storyName = "纵向Menu";