import { FC } from 'react';
import Select, { SelectProps } from './select';
import Option, { SelectOptionProps } from './option';

export type ISelectComponent = FC<SelectProps> & {
  Option: FC<SelectOptionProps>,
};

const BetterSelect = Select as ISelectComponent;
BetterSelect.Option = Option;

export default BetterSelect;