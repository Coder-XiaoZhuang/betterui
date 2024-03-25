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
  const { dispatch } = useContext(FormContext);
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
      },
    });
  }, [dispatch, label, name]);
  return (
    <div className={ rowClass }>
      { label && 
        <div className='better-form-item-label'>
          <label title={ label }>{ label }</label>
        </div>
      }
      <div className='better-form-item'>
        { children }
      </div>
    </div>
  );
};

export default FormItem;