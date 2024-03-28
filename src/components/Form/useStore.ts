import { useState, useReducer } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import { mapValues, each } from 'lodash-es';

export type CustomRuleFunc = ({ getFieldValue }: { getFieldValue: (key: string) => string }) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
};
export interface FieldsState {
  [key: string]: FieldDetail;
};
export interface FormState {
  isValid: boolean;
  isSubmit: boolean;
  errors: Record<string, ValidateError[]>;
};
export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult';
  name: string;
  value: any;
};
export interface validateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}
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
  const [ form, setForm ] = useState<FormState>({ isValid: true, isSubmit: false, errors: {}, });
  const [ fields, dispatch ] = useReducer(fieldsReducer, {});
  const getFieldValue = (key: string) => {
    return fields[key]?.value;
  }
  const transformRules = (rules: CustomRule[]) => (rules.map(rule => (typeof rule === 'function' ? rule({ getFieldValue }) : rule)));
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const afterRules = transformRules(rules);
    const descriptor = { [name]: afterRules };
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
  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    // { 'username': 'better' }
    const valueMap = mapValues(fields, field => field.value);
    const descriptor = mapValues(fields, field => transformRules(field.rules));
    const validator = new Schema(descriptor);
    setForm({
      ...form,
      isSubmit: true,
    });
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as validateErrorType;
      errors = err.fields;
      each(fields, (value, name) => {
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({
            type: 'updateValidateResult',
            name,
            value: { 
              isValid: false,
              errors: itemErrors,
            },
          });
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({
            type: 'updateValidateResult',
            name,
            value: {
              isValid: true,
              errors: [],
            },
          });
        }
      });
    } finally {
      setForm({
        ...form,
        isSubmit: false,
        isValid,
        errors,
      });
      return {
        isValid,
        errors,
        values: valueMap,
      };
    }
  }
  return {
    form,
    fields,
    dispatch,
    getFieldValue,
    validateField,
    validateAllFields,
  };
}

export default useStore;