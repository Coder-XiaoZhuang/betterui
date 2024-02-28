import React, { ReactNode, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  /**选填，设置 MenuItem 的索引值 */
  index?: string;
  /**选填，设置 MenuItem 的自定义类名 */
  className?: string;
  /**选填，设置 MenuItem 的禁用 */
  disabled?: boolean;
  /**选填，设置 MenuItem 的自定义样式 */
  style?: React.CSSProperties;
  /**选填，设置 MenuItem 的子元素 */
  children?: ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    index,
    className,
    disabled,
    style,
    children
  } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index);
    }
  };

  return (
    <li
      className={ classes }
      style={ style }
      onClick={ handleClick }
    >
      { children }
    </li>
  );
}

MenuItem.defaultProps = {
  disabled: false,
};
MenuItem.displayName = 'MenuItem';

export default MenuItem;