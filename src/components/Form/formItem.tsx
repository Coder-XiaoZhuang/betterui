/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactNode, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FormContext } from './form';
import { CustomRule } from './useStore';

export type SomeRequired<T, K extends keyof T> = T & Required<Pick<T, K>> & Omit<T, K>;
export interface FormItemProps {
  /**必填，设置表单项字段名 */
  name: string,
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
};

export const FormItem: FC<FormItemProps> = (props) => {
  const { 
    name, 
    label, 
    children, 
    valuePropName, 
    trigger, 
    getValueFromEvent,
    rules,
    validateTrigger,
  } = props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>;
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext);
  const rowClass = classNames('better-row', {
    'better-row-no-label': !label,
  });
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || '';
    dispatch({
      type: 'addField',
      name,
      value: {
        label,
        name,
        value,
        rules: rules || [],
        errors: [],
        isValid: true,
      },
    });
  }, []);
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e);
    dispatch({
      type: 'updateValue',
      name,
      value,
    });
  }
  const onValueValidate = async () => {
    await validateField(name);
  }
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const errors = fieldState && fieldState.errors;
  const isRequired = rules && rules.some(rule => (typeof rule !== 'function' && rule.required));
  const hasError = errors && errors.length > 0;
  const labelClass = classNames({
    'better-form-item-required': isRequired,
  });
  const itemClass = classNames('better-form-item-control', {
    'better-form-item-has-error': hasError,
  });

  const controlProps: Record<string, any> = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = onValueUpdate;

  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }

  const childList = React.Children.toArray(children);
  if (childList.length === 0) {
    console.error('FormItem must have a child element');
  }
  if (childList.length > 1) {
    console.warn('FormItem must have only one child element');
  }
  if (!React.isValidElement(childList[0])) {
    console.error('Child Element is not a valid React Element');
  }
  const child = childList[0] as React.ReactElement;
  const returnChildNode = React.cloneElement(child, { ...child.props, ...controlProps });
  return (
    <div className={ rowClass }>
      { label && 
        <div className='better-form-item-label'>
          <label className={ labelClass } title={ label }>{ label }</label>
        </div>
      }
      <div className='better-form-item'>
        <div className={ itemClass }>
          { returnChildNode }
        </div>
        {
          hasError && 
          <div className='better-form-item-explain'>
            <span>{ errors[0]?.message }</span>
          </div>
        }
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: (e: any) => e.target.value,
};
export default FormItem;