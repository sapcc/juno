import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SideNavigationItem } from './index';

describe('SideNavigation', () => {
  
  test('renders a SideNavigationItem', async () => {
    render(<SideNavigationItem data-testid="side-nav-item" />);
    expect(screen.getByTestId('side-nav-item')).toBeInTheDocument();
    expect(screen.getByTestId('side-nav-item')).toHaveClass("juno-sidenavigation-item");
  });
  
  test("renders an icon as passed", async () => {
    render(<SideNavigationItem icon="warning" />)
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "warning");
  })
  
  test("renders a plain, non-interactive item when no href or onClick are passed", async () => {
    render(<SideNavigationItem data-testid="side-nav-item" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
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
    expect(screen.getByTestId('side-nav-item')).toBeInTheDocument();
    expect(screen.getByTestId('side-nav-item')).toHaveClass("juno-sidenavigation-item");
    expect(screen.getByTestId('side-nav-item')).toHaveClass("juno-sidenavigation-item-active");
  });
  
  test('renders an aria-label as passed', async () => {
    render(<SideNavigationItem  href="#" ariaLabel="hey nav item!" />);
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'hey nav item!');
  });
  
  test("renders children as passed", async () => {
    render(<SideNavigationItem data-testid="side-nav-item" >Test</SideNavigationItem>)
    expect(screen.getByTestId('side-nav-item')).toBeInTheDocument();
    expect(screen.getByTestId('side-nav-item')).toHaveTextContent("Test");
  })
  
  test("onClick handler is called as passed", () => {
    const onClickSpy = jest.fn()
    render(<SideNavigationItem onClick={onClickSpy} />)
    screen.getByRole("button").click()
    expect(onClickSpy).toHaveBeenCalled()
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