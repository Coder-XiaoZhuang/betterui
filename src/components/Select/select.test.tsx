/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { config } from 'react-transition-group';
import { render, fireEvent } from '@testing-library/react';
import Select, { SelectProps } from './select';
import Option from './option';

config.disabled = true;

jest.mock('../Icon/icon', () => ((props: any) => (<span onClick={ props.onClick }>{ props.icon }</span>)));

const testProps: SelectProps = {
  defaultValue: '',
  placeholder: 'test',
  onChange: jest.fn(),
  onVisibleChange: jest.fn(),
};

const multipleProps: SelectProps = {
  ...testProps,
  multiple: true,
};
describe('test Select component', () => {
  it('should render the correct Select component', () => {
    const { getByPlaceholderText, getByText } = render(
      <Select { ...testProps }>
        <Option value="better1" label="better1"/>
        <Option value="better2" label="better2"/>
        <Option value="better3" disabled label="better3"/>
      </Select>
    );
    const inputEle = getByPlaceholderText('test') as HTMLInputElement;
    expect(inputEle).toBeInTheDocument();
    // click the input
    fireEvent.click(inputEle);
    const firstItem = getByText('better1');
    const disabledItem = getByText('better3');
    expect(firstItem).toBeInTheDocument();
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(true);
    // click disabled item should not working
    fireEvent.click(disabledItem);
    expect(disabledItem).toBeInTheDocument();
    // click the dropdown
    fireEvent.click(firstItem);
    expect(firstItem).not.toBeInTheDocument();
    // check  the events
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(false);
    expect(testProps.onChange).toHaveBeenCalledWith('better1', ['better1']);
    expect(inputEle.value).toEqual('better1');
    // test focus
    expect(document.activeElement).toEqual(inputEle);
  });

  it('Select in multiple mode should works fine', () => {
    const { getByPlaceholderText, getByText, container } = render(
      <Select { ...multipleProps }>
        <Option value="better1" label="better1"/>
        <Option value="better2" label="better2"/>
        <Option value="better3" label="better3"/>
      </Select>
    );
    const inputEle = getByPlaceholderText('test') as HTMLInputElement;
    fireEvent.click(inputEle);
    const firstItem = getByText('better1');
    const secondItem = getByText('better2');
    fireEvent.click(firstItem);
    expect(firstItem).toBeInTheDocument();
    // add selected classname 
    expect(firstItem).toHaveClass('is-selected');
    // add check icon
    expect(getByText('check')).toBeInTheDocument();
    // fire events
    expect(multipleProps.onChange).toHaveBeenCalledWith('better1', ['better1']);
    // add tags
    expect(container.querySelectorAll('.better-tag').length).toEqual(1);
    //remove placeholder
    expect(inputEle.placeholder).toEqual('');
    // click 2nd item
    fireEvent.click(secondItem);
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('better2', ['better1', 'better2']);
    expect(container.querySelectorAll('.better-tag').length).toEqual(2);
    //reclick 2nd item
    fireEvent.click(secondItem);
    // remove acitve class
    expect(secondItem).not.toHaveClass('is-selected');
    // remove tags
    expect(container.querySelectorAll('.better-tag').length).toEqual(1);
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('better2', ['better1']);
    // click tag close
    fireEvent.click(getByText('times'));
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('better1', []);
    //remove all tags
    expect(container.querySelectorAll('.better-tag').length).toEqual(0);
    //refill placeholder text
    expect(inputEle.placeholder).toEqual('test');
  });
});

