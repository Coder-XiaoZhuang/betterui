import { FC } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    /** 选填，根据不同主题显示不同的颜色 */
    theme?: ThemeProps;
}
/**
 * 提供了一套常用的图标集合，基于 react-fontawesome 实现
 *
 * 支持 react-fontawesome 的所有属性，可以在这里查询：
 *  https://github.com/FortAwesome/react-fontawesome#basic
 *
 * 支持 react-fontawesome 所有 free-solid-icons，可以在这里查看所有图标：
 *  https://fontawesome.com/icons?d=gallery&s=solid&m=free
 *
 * ~~~js
 * // 这样引用
 * import { BetterIcon } from 'betterui';
 * ~~~
 *
 */
export declare const Icon: FC<IconProps>;
export default Icon;
