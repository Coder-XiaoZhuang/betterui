import { FC } from 'react';
import Tabs, { TabsProps } from './tabs';
import TabItem, { TabItemProps } from './tabItem';

export type ITabsComponent = FC<TabsProps> & {
  Item: FC<TabItemProps>;
};
const BetterTabs = Tabs as ITabsComponent;
BetterTabs.Item = TabItem;

export default BetterTabs;