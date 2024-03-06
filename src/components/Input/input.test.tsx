import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Input, InputProps } from './input';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};

describe('test Input component', () => {
  it('should render the correct default Input', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Input {...defaultProps}/>);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('better-input-inner');
    fireEvent.change(testNode, { target: { value: '23' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('23');
  });
  it('should render the disabled Input on disabled property', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Input disabled placeholder="disabled"/>);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it('should render different input sizes on size property', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Input placeholder="sizes" size="lg" />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const testContainer = wrapper.container.querySelector('.better-input-wrapper');
    expect(testContainer).toHaveClass('input-size-lg');
  });
  it('should render prepand and append element on prepand/append property', () => {
    const {queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com"/>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const testContainer = container.querySelector('.better-input-wrapper');
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend');
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(queryByText('https://')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(queryByText('.com')).toBeInTheDocument();
  });
});