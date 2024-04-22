import { FC } from 'react';
import { MenuProps } from './menu';
import { SubMenuProps } from './subMenu';
import { MenuItemProps } from './menuItem';
export type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const BetterMenu: IMenuComponent;
export default BetterMenu;
