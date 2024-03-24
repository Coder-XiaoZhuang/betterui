import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

export interface FormItemProps {
  label?: string;
  children?: ReactNode;
};

export const FormItem: FC<FormItemProps> = (props) => {
  const { label, children } = props;
  const rowClass = classNames('better-row', {
    'better-row-no-label': !label,
  });
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