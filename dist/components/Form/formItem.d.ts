import { FC, ReactNode } from 'react';
import { CustomRule } from './useStore';
export type SomeRequired<T, K extends keyof T> = T & Required<Pick<T, K>> & Omit<T, K>;
export interface FormItemProps {
    /**必填，设置表单项字段名 */
    name: string;
    /**选填，设置表单项标签文本 */
    label?: string;
    /**选填，设置表单项子元素 */
    children?: ReactNode;
    /**选填，设置表单项值的属性，例如 checkbox 的是 'checked' */
    valuePropName?: string;
    /**选填，设置表单项值的更新触发事件 */
    trigger?: string;
    /**选填，设置如何将 event 的值转换成字段值 */
    getValueFromEvent?: (...args: any) => any;
    /**选填，设置校验规则 */
    rules?: CustomRule[];
    /**选填，设置校验触发事件 */
    validateTrigger?: string;
}
export declare const FormItem: FC<FormItemProps>;
export default FormItem;
