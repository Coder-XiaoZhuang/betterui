import React, { FC, ReactNode } from 'react';
import useStore from './useStore';

export interface FormProps {
  name?: string;
  children?: ReactNode;
};

export const Form: FC<FormProps> = (props) => {
  const { name, children } = props;
  const { form, fields, dispatch } = useStore();
  return (
    <>
      <form name={ name } className='better-form'>
        { children }
      </form>
      <div style={{ whiteSpace: 'pre-wrap' }}>{ JSON.stringify(form) }</div>
      <div style={{ whiteSpace: 'pre-wrap' }}>{ JSON.stringify(fields) }</div>
    </>
  );
};

Form.defaultProps = {
  name: 'better-form',
};

export default Form;