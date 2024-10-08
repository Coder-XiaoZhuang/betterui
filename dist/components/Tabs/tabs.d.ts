import { FC, ReactNode } from 'react';
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
}
/**
 * 用于承载同一层级下不同页面或类别的组件，方便用户在同一个页面框架下进行快速切换。
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterTabs>，<BetterTabs.Item>
 * import { BetterTabs } from 'betterui';
 * ~~~
 *
 */
export declare const Tabs: FC<TabsProps>;
export default Tabs;
