import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterAutoComplete, { AutoCompleteProps, DataSourceType } from './autoComplete';
interface LakerPlayerProps {
  value: string;
  number: number;
};
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
};
export default { 
  id: 'BetterAutoComplete',
  title: 'AutoComplete 联想搜索',
  component: BetterAutoComplete,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof BetterAutoComplete>;

export const SimpleAutoComplete: ComponentStory<typeof BetterAutoComplete> = (args) => {
  const playerArr = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
  const handleFetch = (query: string) => playerArr.filter(name => name.includes(query)).map(name => ({ value: name, }));
  return (
    <BetterAutoComplete
      { ...args }
      placeholder="请输入"
      fetchSuggestions={ handleFetch }
    />
  );
};
SimpleAutoComplete.storyName = '支持基本的联想搜索';

export const CustomAutoComplete = (args: AutoCompleteProps) => {
  const playerArr = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ] ;
  const handleFetch = (query: string) => playerArr.filter(player => player.value.includes(query));
  const renderOption = (item: DataSourceType) => {
    const player = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <span>球星名字: {player.value}</span>&nbsp;&nbsp;
        <span>球衣号码: {player.number}</span>
      </>
    );
  };
  return (
    <BetterAutoComplete
      { ...args }
      fetchSuggestions={ handleFetch }
      placeholder="请输入"
      renderOption={ renderOption }
    />
  );
};
CustomAutoComplete.storyName = '支持自定义搜索结果模版';

export const AysncAutoComplete = (args: AutoCompleteProps) => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => items.slice(0, 10).map((item: any) => ({ value: item.login, ...item, })));
  };

  const renderOption = (item: DataSourceType) => {
    const user = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <span>{ user.value }</span>
      </>
    );
  };
  return (
    <BetterAutoComplete
      { ...args }
      fetchSuggestions={ handleFetch }
      placeholder="请输入"
      renderOption={ renderOption }
    />
  );
};
AysncAutoComplete.storyName = '支持异步搜索';