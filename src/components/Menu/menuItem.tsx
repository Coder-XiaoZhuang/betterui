import React, { ReactNode } from "react";
import classNames from "classnames";

export interface MenuItemProps {
  index?: number;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
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

  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
  });

  return (
    <li
      className={ classes }
      style={ style }
    >
      { children }
    </li>
  );
}

MenuItem.defaultProps = {
  disabled: false,
};

export default MenuItem;