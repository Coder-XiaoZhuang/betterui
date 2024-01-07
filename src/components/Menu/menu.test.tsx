import React from 'react';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import Menu, {MenuProps} from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4'],
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile: string = `
    .better-submenu {
      display: none;
    }
    .better-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
}
let screen: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    screen = render(generateMenu(testProps));
    screen.container.append(createStyleFile());
    menuElement= screen.getByTestId('test-menu');
    activeElement = screen.getByText('active');
    disabledElement = screen.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('better-menu test');
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = screen.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('should show dropdown items when click on subMenu', async () => {
    expect(screen.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = screen.getByText('dropdown');
    fireEvent.click(dropdownElement);
    expect(screen.queryByText('drop1')).toBeVisible();
  })
})
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    screen = render(generateMenu(testVerProps));
    screen.container.append(createStyleFile());
  });
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(screen.queryByText('opened1')).toBeVisible();
  });
  it('should show dropdown items when hover on subMenu for vertical mode', async () => {
    const dropdownElement = screen.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(screen.queryByText('drop1')).toBeVisible();
    });
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(screen.queryByText('drop1')).not.toBeVisible();
    });
  });
});