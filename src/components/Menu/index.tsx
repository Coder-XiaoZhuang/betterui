import { FC } from 'react';
import Menu, { MenuProps } from './menu';
import SubMenu, { SubMenuProps } from './subMenu';
import MenuItem, { MenuItemProps } from './menuItem';

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

const BetterMenu = Menu as IMenuComponent;
BetterMenu.Item = MenuItem;
BetterMenu.SubMenu = SubMenu;

export default BetterMenu;