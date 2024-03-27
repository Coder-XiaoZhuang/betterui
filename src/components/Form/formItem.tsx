import React, { FC, ReactNode, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FormContext } from './form';
import { RuleItem } from 'async-validator';

export type SomeRequired<T, K extends keyof T> = T & Required<Pick<T, K>> & Omit<T, K>;
export interface FormItemProps {
  name: string,
  label?: string;
  children?: ReactNode;
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (...args: any) => any;
  rules?: RuleItem[];
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
    return dispatch({
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
  }, [dispatch, initialValues, label, name, rules]);
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e);
    console.log('value:', value);
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
  const isRequired = rules && rules.some(rule => rule.required);
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