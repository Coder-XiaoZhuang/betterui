import React,{ useContext, useState, FunctionComponentElement, ReactNode } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface SubMenuProps {
  /**选填，设置 SubMenu 的索引值 */
  index?: string;
  /**必填，设置 SubMenu 的标题文字 */
  title: string;
  /**选填，设置 SubMenu 的自定义类名 */
  className?: string;
  /**选填，设置 SubMenu 的子元素 */
  children?: ReactNode,
};

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [ menuOpen, setOpen ] = useState(isOpen);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index.includes(`${index}`),
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  }
  const allEvents = (
    context.mode !== 'vertical' ? 
      {
        onClick: handleClick,
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
      } : 
      {
        onClick: handleClick,
      }
  );
  const renderChildren = () => {
    const subMenuClasses = classNames("better-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component");
      }
    });
    return (
      <Transition
        in={ menuOpen }
        timeout={ 300 }
        animation="zoom-in-top"
      >
        <ul className={ subMenuClasses }>
          { childrenComponent }
        </ul>
      </Transition>
    );
  }
  return (
    <li key={ index } className={ classes } { ...allEvents }>
      <div className="submenu-title" { ...allEvents }>
        { title }
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      { renderChildren() }
    </li>
  );
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;