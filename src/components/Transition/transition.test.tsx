/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Transition } from './transition';

describe('Transition', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Transition
        in={ true }
        timeout={ 300 }
        animation="zoom-in-top"
      >
        <div>Child Component</div>
      </Transition>
    );
    expect(getByText('Child Component')).toBeInTheDocument();
  });

  it('applies custom classNames correctly', () => {
    render(
      <Transition
        classNames="custom-transition"
        in={ true }
        timeout={ 300 }
        animation="zoom-in-top"
      >
        <div>Child Component</div>
      </Transition>
    );
    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toHaveClass('custom-transition-appear custom-transition-appear-active');
  });
});
