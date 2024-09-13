import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 必填，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选填，选中后执行的回调函数 */
    onSelect?: (item: DataSourceType) => void;
    /** 选填，支持自定义渲染下拉列表 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * 联想搜索，通过鼠标或键盘输入内容进行自动联想，支持同步和异步两种方式。
 * 支持 Input 组件的所有属性，支持键盘事件选择
 *
 * ~~~js
 * // 这样引用
 * import { BetterAutoComplete } from 'betterui';
 * ~~~
 *
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
