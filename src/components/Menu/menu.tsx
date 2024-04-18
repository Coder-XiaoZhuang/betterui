import React, { ReactNode, createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

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
};
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
};

export const MenuContext = createContext<IMenuContext>({ index: '0' });

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 * 
 * ~~~js
 * // 这样引用
 * import { BetterMenu, BetterSubMenu, BetterMenuItem } from 'betterui';
 * ~~~
 * 
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [ currentActive, setActive ] = useState(defaultIndex);
  const classes = classNames("better-menu", className, {
    "menu-vertical": mode === "vertical",
    'menu-horizontal': mode !== 'vertical',
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
  }

  return (
    <ul
      className={ classes }
      style={ style }
      data-testid="test-menu"
    >
      <MenuContext.Provider value={ passedContext }> 
        { renderChildren() }
      </MenuContext.Provider>
    </ul>
  );
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;