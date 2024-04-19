/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BetterTabs, { TabsProps } from './tabs';
import BetterTabItem from './tabItem';

const testProps: TabsProps = {
  defaultIndex: 1,
  onSelect: jest.fn(),
};
let wrapper: RenderResult;

describe('test BetterTabs Component', () => {
  beforeEach(() => {
    wrapper = render(
      <BetterTabs {...testProps}>
        <BetterTabItem label="tab1">content1</BetterTabItem>
        <BetterTabItem label="tab2">content2</BetterTabItem>
        <BetterTabItem label="disabled" disabled>content3</BetterTabItem>
      </BetterTabs>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the correct default BetterTabs', () => {
    const { queryByText, container } = wrapper;
    expect(container.querySelector('.better-tabs-nav')).toHaveClass('nav-line');
    const activeElement = queryByText('tab2');
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass('is-active');
    expect(queryByText('tab1')).not.toHaveClass('is-active');
    expect(queryByText('content2')).toBeInTheDocument();
    expect(queryByText('content1')).not.toBeInTheDocument();
  });
  it('click tabItem should switch to content', () => {
    const { queryByText, getByText } = wrapper;
    const clickedElement = getByText('tab1');
    fireEvent.click(clickedElement);
    expect(clickedElement).toHaveClass('is-active');
    expect(queryByText('tab2')).not.toHaveClass('is-active');
    expect(queryByText('content1')).toBeInTheDocument();
    expect(queryByText('content2')).not.toBeInTheDocument();
    expect(testProps.onSelect).toHaveBeenCalledWith(0);
  });
  it('click disabled tabItem should not works', () => {
    const { getByText } = wrapper;
    const disableElement = getByText('disabled');
    expect(disableElement).toHaveClass('disabled');
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalled();
  });
});