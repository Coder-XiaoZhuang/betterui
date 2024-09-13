/// <reference types="react" />
import { RuleItem, ValidateError } from 'async-validator';
export type CustomRuleFunc = ({ getFieldValue }: {
    getFieldValue: (key: string) => string;
}) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
    name: string;
    value: string;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FieldsState {
    [key: string]: FieldDetail;
}
export interface FormState {
    isValid: boolean;
    isSubmit: boolean;
    errors: Record<string, ValidateError[]>;
}
export interface FieldsAction {
    type: 'addField' | 'updateValue' | 'updateValidateResult';
    name: string;
    value: any;
}
export interface validateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}
declare function useStore(initialValues?: Record<string, any>): {
    form: FormState;
    fields: FieldsState;
    dispatch: import("react").Dispatch<FieldsAction>;
    getFieldValue: (key: string) => string;
    getFieldsValue: () => {
        [x: string]: string;
    };
    setFieldValue: (name: string, value: any) => void;
    resetFieldsValue: () => void;
    validateField: (name: string) => Promise<void>;
    validateAllFields: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            [x: string]: string;
        };
    }>;
};
export default useStore;
