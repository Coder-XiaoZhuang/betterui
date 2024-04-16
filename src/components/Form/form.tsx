import React, { ReactNode, createContext, forwardRef, useImperativeHandle } from 'react';
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
};
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export type IFormRef = Omit<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'form'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);

/**
 * Form 表单，用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。
 * 
 * ~~~js
 * // 这样引用
 * import { Form, Item } from 'betterui';
 * ~~~
 * 
 */
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { name, children, initialValues, onSuccessfulSubmit, onFailedSubmit } = props;
  const { form, fields, dispatch, ...restProps } = useStore(initialValues);
  const { validateField, validateAllFields } = restProps;
  useImperativeHandle(ref, () => ({ ...restProps, }));
  const passedContext: IFormContext = { dispatch, fields, initialValues, validateField, };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values, } = await validateAllFields();
    if (isValid) {
      onSuccessfulSubmit && onSuccessfulSubmit(values);
    } else {
      onFailedSubmit && onFailedSubmit(values, errors);
    }
  };
  return (
    <>
      <form name={ name } className='better-form' onSubmit={ submitForm }>
        <FormContext.Provider value={ passedContext }>
          { typeof children === 'function' ? children(form) : children }
        </FormContext.Provider>
      </form>
    </>
  );
});

Form.defaultProps = {
  name: 'better-form',
};

export default Form;