import * as React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SideNavigation } from '../SideNavigation/index';
import { SideNavigationItem } from './index';

const mockOnClick = jest.fn()

describe('SideNavigationItem', () => {
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  })
  
  test('renders a SideNavigationItem', async () => {
    render(<SideNavigationItem data-testid="side-nav-item" />);
    expect(screen.getByTestId('side-nav-item')).toBeInTheDocument();
    expect(screen.getByTestId('side-nav-item')).toHaveClass("juno-sidenavigation-item");
  })
  
  test("renders a label as passed", async () => {
    render(<SideNavigationItem label="My Label" />)
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("My Label");
  })
  
  test("renders a disabled side navigation item as passed", async () => {
    render(<SideNavigationItem disabled />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  })
  
  test("renders an icon as passed", async () => {
    render(<SideNavigationItem icon="warning" />)
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "warning");
  })
  
  test("renders as a link when a href prop is passed", async () => {
    render(<SideNavigationItem href="#"/>);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveClass("juno-sidenavigation-item");
  })
  
  test("renders as a button when an onClick prop is passed", async () => {
    render(<SideNavigationItem onClick={()=>{console.log("click")}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("juno-sidenavigation-item");
  })
  
  test('renders an active ToppNavigationItem as passed', async () => {
    render(<SideNavigationItem data-testid="side-nav-item" active />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("juno-sidenavigation-item");
    expect(screen.getByRole("button")).toHaveClass("juno-sidenavigation-item-active");
    expect(screen.getByRole("button")).toHaveAttribute("aria-selected", "true");
  });
  
  test('renders an aria-label as passed', async () => {
    render(<SideNavigationItem  href="#" ariaLabel="hey nav item!" />);
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'hey nav item!');
  });
  
  test("executes an onClick handler as passed", async () => {
    render(
      <SideNavigation>
        <SideNavigationItem onClick={mockOnClick} label="My Item"/>
      </SideNavigation>)
    expect(screen.getByRole("button", {name: "My Item"})).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", {name: "My Item"}))
    expect(mockOnClick).toHaveBeenCalled()
  })

  test('renders custom classNames as passed', async () => {
    render(<SideNavigationItem  data-testid="side-nav-item" className='my-custom-class' />);
    expect(screen.getByTestId('side-nav-item')).toHaveClass('my-custom-class');
  });

  test('renders all props as passed', async () => {
    render(<SideNavigationItem  data-testid="side-nav-item" data-lol='Prop goes here' />);
    expect(screen.getByTestId('side-nav-item')).toHaveAttribute('data-lol', 'Prop goes here');
  });
  
});