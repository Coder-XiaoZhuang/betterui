import React from "react";
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    /**选填，设置 Button 的自定义类名 */
    className?: string;
    /**选填，设置 Button 的禁用 */
    disabled?: boolean;
    /**选填，设置 Button 的尺寸 */
    size?: ButtonSize;
    /**选填，设置 Button 的类型 */
    btnType?: ButtonType;
    /**选填，设置 Button 的子元素 */
    children: React.ReactNode;
    /**选填，设置 Button 的超链接目标，仅在btnType属性为link时有效 */
    href?: string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 *
 * ~~~js
 * // 这样引用
 * import { BetterButton } from 'betterui';
 * ~~~
 *
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
