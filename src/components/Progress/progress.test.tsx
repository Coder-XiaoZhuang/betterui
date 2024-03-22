/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Progress from './progress';

describe('Progress Component', () => {
  it('renders without error', () => {
    render(<Progress percent={ 50 } />);
  });

  it('displays the correct progress percentage', () => {
    const { getByText } = render(<Progress percent={ 75 } />);
    expect(getByText('75%')).toBeInTheDocument();
  });

  it('applies custom styles correctly', () => {
    const customStyles = { color: 'red' };
    const { container } = render(<Progress percent={ 25 } styles={ customStyles } />);
    expect(container.firstChild).toHaveStyle('color: red');
  });

  it('does not display the progress text if showText is set to false', () => {
    const { queryByText } = render(<Progress percent={ 60 } showText={false} />);
    expect(queryByText('60%')).toBeNull();
  });
});
