import React, { FC, ReactNode, createContext } from 'react';
import useStore from './useStore';

export interface FormProps {
  name?: string;
  initialValues?: Record<string, any>;
  children?: ReactNode;
};
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields'> & Pick<FormProps, 'initialValues'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form: FC<FormProps> = (props) => {
  const { name, children, initialValues } = props;
  const { form, fields, dispatch } = useStore();
  const passedContext: IFormContext = { dispatch, fields, initialValues };
  return (
    <>
      <form name={ name } className='better-form'>
        <FormContext.Provider value={ passedContext }>
          { children }
        </FormContext.Provider>
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