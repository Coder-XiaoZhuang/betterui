import React, { ReactNode } from "react";
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
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
