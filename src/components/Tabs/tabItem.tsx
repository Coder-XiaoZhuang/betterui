import React, { FC, ReactNode } from 'react';

export interface TabItemProps {
  /**必填，设置 Tab 选项上面的文字 */
  label: string | React.ReactElement;
  /**选填，设置 Tab 选项是否被禁用 */
  disabled?: boolean;
  /**选填，设置 Tab 的子元素 */
  children?: ReactNode;
};

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return (
    <div className="better-tab-panel">
      { children }
    </div>
  );
};

export default TabItem;