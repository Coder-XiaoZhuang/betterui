import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AutoComplete, DataSourceType } from './autoComplete';

interface LakerPlayerProps {
  value: string;
  number: number;
};
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
};
const SimpleComplete = () => {
  // 第一种情况
  // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  //   'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({ value: name, }));
  // };

  // 第二种情况
  // const lakersWithNumber = [
  //   {value: 'bradley', number: 11},
  //   {value: 'pope', number: 1},
  //   {value: 'caruso', number: 4},
  //   {value: 'cook', number: 2},
  //   {value: 'cousins', number: 15},
  //   {value: 'james', number: 23},
  //   {value: 'AD', number: 3},
  //   {value: 'green', number: 14},
  //   {value: 'howard', number: 39},
  //   {value: 'kuzma', number: 0},
  // ];
  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter(player => player.value.includes(query));
  // };
  // const renderOption = (item: DataSourceType) => {
  //   const itemWithNumber = item as DataSourceType<LakerPlayerProps>;
  //   return (
  //     <>
  //       <b>名字: { itemWithNumber.value }</b>
  //       <span>球衣号码: { itemWithNumber.number }</span>
  //     </>
  //   );
  // };

  // 第三种情况
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      });
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <b>Name: { itemWithGithub.value }</b>
        <span>url: { itemWithGithub.url }</span>
      </>
    );
  };
  return (
    <AutoComplete
      fetchSuggestions={ handleFetch }
      onSelect={ action('selected') }
      renderOption={ renderOption }
    />
  );
};

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete);