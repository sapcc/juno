import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopNavigationItem } from './index';

describe('TopNavigation', () => {
  
  test('renders a ToppNavigationItem', async () => {
    render(<TopNavigationItem data-testid="top-nav-item" />);
    expect(screen.getByTestId('top-nav-item')).toBeInTheDocument();
    expect(screen.getByTestId('top-nav-item')).toHaveClass("juno-topnavigation-item");
  });
  
  test("renders an icon as passed", async () => {
    render(<TopNavigationItem icon="warning" />)
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "warning");
  })
  
  test("renders a plain, non-interactive item when no href or onClick are passed", async () => {
    render(<TopNavigationItem data-testid="top-nav-item" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  })
  
  test("renders as a link when a href prop is passed", async () => {
    render(<TopNavigationItem href="#"/>);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveClass("juno-topnavigation-item");
  })
  
  test("renders as a button when an onClick prop is passed", async () => {
    render(<TopNavigationItem onClick={()=>{console.log("click")}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("juno-topnavigation-item");
  })
  
  test('renders an active ToppNavigationItem as passed', async () => {
    render(<TopNavigationItem data-testid="top-nav-item" active />);
    expect(screen.getByTestId('top-nav-item')).toBeInTheDocument();
    expect(screen.getByTestId('top-nav-item')).toHaveClass("juno-topnavigation-item");
    expect(screen.getByTestId('top-nav-item')).toHaveClass("juno-topnavigation-item-active");
  });
  
  test('renders an aria-label as passed', async () => {
    render(<TopNavigationItem  href="#" ariaLabel="hey nav item!" />);
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'hey nav item!');
  });
  
  test("renders children as passed", async () => {
    render(<TopNavigationItem data-testid="top-nav-item" >Test</TopNavigationItem>)
    expect(screen.getByTestId('top-nav-item')).toBeInTheDocument();
    expect(screen.getByTestId('top-nav-item')).toHaveTextContent("Test");
  })
  
  test("onClick handler is called as passed", () => {
    const onClickSpy = jest.fn()
    render(<TopNavigationItem onClick={onClickSpy} />)
    screen.getByRole("button").click()
    expect(onClickSpy).toHaveBeenCalled()
  })

  test('renders custom classNames as passed', async () => {
    render(<TopNavigationItem  data-testid="top-nav-item" className='my-custom-class' />);
    expect(screen.getByTestId('top-nav-item')).toHaveClass('my-custom-class');
  });

  test('renders all props as passed', async () => {
    render(<TopNavigationItem  data-testid="top-nav-item" data-lol='Prop goes here' />);
    expect(screen.getByTestId('top-nav-item')).toHaveAttribute('data-lol', 'Prop goes here');
  });
  
});