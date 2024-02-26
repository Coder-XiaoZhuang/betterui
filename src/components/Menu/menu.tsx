import React, { ReactNode, createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  children?: ReactNode;
  onSelect?: SelectCallback;
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
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ### 引用方法
 * 
 * ```javascript
 * import { Menu, MenuItem, SubMenu } from 'betterui'
 * ```
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