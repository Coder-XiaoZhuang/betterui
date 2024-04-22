import { FC } from 'react';
import Form from './form';
import Item, { FormItemProps } from './formItem';

export type IFormComponent = typeof Form & {
  Item: FC<FormItemProps>;
};

const BetterForm: IFormComponent = Form as IFormComponent;
BetterForm.Item = Item;

export default BetterForm;