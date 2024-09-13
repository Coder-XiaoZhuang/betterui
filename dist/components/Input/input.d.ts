import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**选填，设置 Input 的禁用 */
    disabled?: boolean;
    /**选填，设置 Input 大小，支持 lg 或者是 sm */
    size?: InputSize;
    /**选填，设置 Input 右侧悬浮的图标，用于提示 */
    icon?: IconProp;
    /**选填，设置 Input 前缀，用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**选填，设置 Input 后缀，用于配置一些固定组合 */
    append?: string | ReactElement;
    /**选填，设置 Input 的占位符 */
    placeholder?: string;
    /**选填，设置 Input 的 change 事件 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框，通过鼠标或键盘输入内容，是最基础的表单域的包装，支持 HTMLInput 的所有基本属性
 *
 * ~~~js
 * // 这样引用
 * import { BetterInput } from 'betterui';
 * ~~~
 *
 */
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
