import React, { FC, ReactNode, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FormContext } from './form';

export interface FormItemProps {
  name: string,
  label?: string;
  children?: ReactNode;
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (...args: any) => any;
};

export const FormItem: FC<FormItemProps> = (props) => {
  const { name, label, children, valuePropName, trigger, getValueFromEvent } = props;
  const { dispatch, fields } = useContext(FormContext);
  const rowClass = classNames('better-row', {
    'better-row-no-label': !label,
  });
  useEffect(() => {
    return dispatch({
      type: 'addField',
      name,
      value: {
        label,
        name,
        value: '',
      },
    });
  }, [dispatch, label, name]);
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent && getValueFromEvent(e);
    console.log('value:', value);
    dispatch({
      type: 'updateValue',
      name,
      value,
    });
  }
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;

  const controlProps: Record<string, any> = {};
  controlProps[valuePropName!] = value;
  controlProps[trigger!] = onValueUpdate;

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
          <label title={ label }>{ label }</label>
        </div>
      }
      <div className='better-form-item'>
        { returnChildNode }
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  getValueFromEvent: (e: any) => e.target.value,
};
export default FormItem;