import React, { ReactNode } from "react";
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /**选填，设置 active 菜单项的索引值 */
    defaultIndex?: string;
    /**选填，设置 Menu 的自定义类名 */
    className?: string;
    /**选填，设置 Menu 的展示类型，分为横向模式（horizontal）和纵向模式（vertical） */
    mode?: MenuMode;
    /**选填，设置 Menu 的自定义样式 */
    style?: React.CSSProperties;
    /**选填，设置 Menu 的子元素 */
    children?: ReactNode;
    /**选填，点击菜单项触发的回调函数 */
    onSelect?: SelectCallback;
    /**选填，设置默认展开的子菜单数组，仅当 mode 为纵向模式（vertical）时生效 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterMenu>，<BetterMenu.SubMenu>，<BetterMenu.Item>
 * import { BetterMenu } from 'betterui';
 * ~~~
 *
 */
export declare const Menu: React.FC<MenuProps>;
export default Menu;
