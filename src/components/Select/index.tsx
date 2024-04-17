import { FC } from 'react';
import Select, { SelectProps } from './select';
import Option, { SelectOptionProps} from './option';

export type ISelectComponent = FC<SelectProps> & {
  Option: FC<SelectOptionProps>,
};

const TransSelect = Select as ISelectComponent;
TransSelect.Option = Option;

export default TransSelect;