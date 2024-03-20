/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { config } from 'react-transition-group';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete';

config.disabled = true;
jest.mock('../Icon/icon', () => {
  return (props: any) => (<span onClick={props.onClick}>{props.icon}</span>);
});
const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
];
const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ value: string; number: number }>;
  return (
    <>name: {itemWithNumber.value}</>
  );
};
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};
const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption,
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}/>);
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
  });
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}});
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });
    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2);
    //click the first item
    fireEvent.click(wrapper.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11});
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    //fill the input
    expect(inputNode.value).toBe('ab');
  });
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}});
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText('ab');
    const secondResult = wrapper.queryByText('abc');

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass('is-active');
    //arrow down 
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass('is-active');
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass('is-active');
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11});
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
  });
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}});
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
  });
  it('renderOption should generate the right template', async () => {
    const wrapper = render(<AutoComplete {...testPropsWithCustomRender}/>);
    const inputNode = wrapper.getByPlaceholderText('auto-complete-2') as HTMLInputElement;
    fireEvent.change(inputNode, {target: { value: 'a'}});
    await waitFor(() => {
      expect(wrapper.queryByText('name: ab')).toBeInTheDocument();
    });
  });
  it('async fetchSuggestions should works fine', async () => {
    const testPropsWithPromise: AutoCompleteProps = {
      ...testProps,
      fetchSuggestions: jest.fn((query) => { return Promise.resolve(testArray.filter(item => item.value.includes(query))) }),
      placeholder: 'auto-complete-3',
    };
    const wrapper = render(<AutoComplete {...testPropsWithPromise}/>);
    const inputNode = wrapper.getByPlaceholderText('auto-complete-3') as HTMLInputElement;
    fireEvent.change(inputNode, {target: { value: 'a'}});
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled();
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });
  });
});