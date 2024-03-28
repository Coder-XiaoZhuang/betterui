import React, { FC, ReactNode, createContext } from 'react';
import { ValidateError } from 'async-validator';
import useStore from './useStore';

export interface FormProps {
  name?: string;
  initialValues?: Record<string, any>;
  children?: ReactNode;
  onSuccessfulSubmit?: (values: Record<string, any>) => void;
  onFailedSubmit?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
};
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form: FC<FormProps> = (props) => {
  const { name, children, initialValues, onSuccessfulSubmit, onFailedSubmit } = props;
  const { form, fields, dispatch, validateField, validateAllFields } = useStore();
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