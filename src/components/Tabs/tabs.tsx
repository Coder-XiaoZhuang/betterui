import React, { FC, useState, FunctionComponentElement, ReactNode } from 'react';
import classNames from 'classnames';
import { TabItemProps } from './tabItem';

export interface TabsProps {
  /**选填，设置 Tabs 当前激活的index，默认为0 */
  defaultIndex?: number;
  /**选填，设置 Tabs 可以扩展的类名 */
  className?: string;
  /**选填，点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void;
  /**选填，设置 Tabs 的类型，两种可选，默认为 line */
  type?: 'line' | 'card';
  /**选填，设置 Tabs 的子元素 */
  children?: ReactNode;
};

/**
 * 用于承载同一层级下不同页面或类别的组件，方便用户在同一个页面框架下进行快速切换。
 * 
 * ~~~js
 * // 这样引用，再分别使用 <BetterTabs>，<BetterTabs.Item>
 * import { BetterTabs } from 'betterui';
 * ~~~
 * 
 */
export const Tabs: FC<TabsProps> = (props) => {
  const {
    defaultIndex,
    className,
    onSelect,
    children,
    type,
  } = props;
  const [ activeIndex, setActiveIndex ] = useState(defaultIndex);
  const handleClick = (e: React.MouseEvent, index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  };
  const navClass = classNames('better-tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  });
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames('better-tabs-nav-item', {
        'is-active': activeIndex === index,
        'disabled': disabled,
      });
      return (
        <li 
          className={ classes } 
          key={ `nav-item-${index}` }
          onClick={(e) => { handleClick(e, index, disabled) }}
        >
          { label }
        </li>
      );
    });
  };
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child;
      }
    });
  };
  return (
    <div className={`better-tabs ${className}`}>
      <ul className={ navClass }>
        { renderNavLinks() }
      </ul>
      <div className="better-tabs-content">
        { renderContent() }
      </div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line',
};
export default Tabs;