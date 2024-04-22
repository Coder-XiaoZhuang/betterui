/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { config } from 'react-transition-group';
import { render, fireEvent } from '@testing-library/react';
import BetterAlert, { AlertProps } from './alert';

config.disabled = true;

jest.mock('../Icon', () => ((props: any) => <span>{ props.icon }</span>));

const testProps: AlertProps = {
  title: 'title',
  onClose: jest.fn(),
};

const typeProps: AlertProps = {
  ...testProps,
  type: 'success',
  description: 'hello',
  closable: false
};

describe('test BetterAlert Component', () => {
  it('should render the correct default BetterAlert', () => {
    const { getByText, container, queryByText } = render(<BetterAlert {...testProps}/>);
    expect(queryByText('title')).toBeInTheDocument();
    expect(container.querySelector('.better-alert')).toHaveClass('better-alert-default');
    fireEvent.click(getByText('times'));
    expect(testProps.onClose).toHaveBeenCalled();
    expect(queryByText('title')).not.toBeInTheDocument();
  });
  it('should render the correct BetterAlert based on different type and description', () => {
    const { container, queryByText } = render(<BetterAlert {...typeProps}/>);
    expect(queryByText('title')).toHaveClass('bold-title');
    expect(container.querySelector('.better-alert')).toHaveClass('better-alert-success');
    expect(queryByText('hello')).toBeInTheDocument();
    expect(queryByText('times')).not.toBeInTheDocument();
  });
});
