import React, { useState, useReducer } from 'react';
import Schema, { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator';

export interface FieldDetail {
  name: string;
  value: string;
  rules: RuleItem[];
  isValid: boolean;
  errors: ValidateError[];
};

export interface FieldsState {
  [key: string]: FieldDetail;
};

export interface FormState {
  isValid: boolean;
};

export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult';
  name: string;
  value: any;
};
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value },
      }
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      }
    case 'updateValidateResult':
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      }
    default:
      return state;
  }
}
function useStore() {
  const [ form, setForm ] = useState<FormState>({ isValid: true, });
  const [ fields, dispatch ] = useReducer(fieldsReducer, {});
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const descriptor = { [name]: rules };
    const valueMap = { [name]: value };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as any;
      errors = err.errors;
      console.log('e', err.errors);
      console.log('fields', fields);
    } finally {
      dispatch({
        type: 'updateValidateResult',
        name,
        value: { isValid, errors },
      });
    }
  };
  return {
    form,
    fields,
    dispatch,
    validateField,
  };
}

export default useStore;