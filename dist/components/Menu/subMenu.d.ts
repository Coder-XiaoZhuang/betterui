import React, { ReactNode } from "react";
export interface SubMenuProps {
    /**选填，设置 SubMenu 的索引值 */
    index?: string;
    /**必填，设置 SubMenu 的标题文字 */
    title: string;
    /**选填，设置 SubMenu 的自定义类名 */
    className?: string;
    /**选填，设置 SubMenu 的子元素 */
    children?: ReactNode;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
