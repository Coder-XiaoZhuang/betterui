import { FC } from 'react';
import Tabs, { TabsProps } from './tabs';
import TabItem, { TabItemProps } from './tabItem';

export type ITabsComponent = FC<TabsProps> & {
  Item: FC<TabItemProps>;
};
const TransTabs = Tabs as ITabsComponent;
TransTabs.Item = TabItem;

export default TransTabs;