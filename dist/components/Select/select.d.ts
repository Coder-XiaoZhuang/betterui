import React, { FC, ReactNode } from 'react';
export interface SelectProps {
    /**指定默认选中的条目	 可以是是字符串或者字符串数组*/
    defaultValue?: string | string[];
    /** 选择框默认文字*/
    placeholder?: string;
    /** 是否禁用*/
    disabled?: boolean;
    /** 是否支持多选*/
    multiple?: boolean;
    /** select input 的 name 属性	 */
    name?: string;
    /**选中值发生变化时触发 */
    onChange?: (selectedValue: string, selectedValues: string[]) => void;
    /**下拉框出现/隐藏时触发 */
    onVisibleChange?: (visible: boolean) => void;
    children?: ReactNode;
}
export interface ISelectContext {
    onSelect?: (value: string, isSelected?: boolean) => void;
    selectedValues: string[];
    multiple?: boolean;
}
export declare const SelectContext: React.Context<ISelectContext>;
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterSelect>，<BetterSelect.Option>
 * import { BetterSelect } from 'betterui';
 * ~~~
 */
export declare const Select: FC<SelectProps>;
export default Select;
