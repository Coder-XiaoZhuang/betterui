import React, { FC, ReactNode, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FormContext } from './form';

export interface FormItemProps {
  name: string,
  label?: string;
  children?: ReactNode;
};

export const FormItem: FC<FormItemProps> = (props) => {
  const { name, label, children } = props;
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
    const value = e.target.value;
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
  controlProps.value = value;
  controlProps.onChange = onValueUpdate;

  const childList = React.Children.toArray(children);
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

export default FormItem;