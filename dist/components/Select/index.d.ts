import { FC } from 'react';
import { SelectProps } from './select';
import { SelectOptionProps } from './option';
export type ISelectComponent = FC<SelectProps> & {
    Option: FC<SelectOptionProps>;
};
declare const BetterSelect: ISelectComponent;
export default BetterSelect;
