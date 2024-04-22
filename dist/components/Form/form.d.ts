import React, { ReactNode } from 'react';
import { ValidateError } from 'async-validator';
import useStore, { FormState } from './useStore';
export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
    /**选填，设置表单名称，会作为表单字段 id 前缀使用 */
    name?: string;
    /**选填，设置表单的初始值 */
    initialValues?: Record<string, any>;
    /**选填，设置表单的子元素 */
    children?: ReactNode | RenderProps;
    /**选填，设置表单提交成功时的回调函数 */
    onSuccessfulSubmit?: (values: Record<string, any>) => void;
    /**选填，设置表单提交失败时的回调函数 */
    onFailedSubmit?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export type IFormRef = Omit<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'form'>;
export declare const FormContext: React.Context<IFormContext>;
/**
 * Form 表单，用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterForm> 和 <BetterForm.Item>
 * import { BetterForm } from 'betterui';
 * ~~~
 *
 */
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<IFormRef>>;
export default Form;
