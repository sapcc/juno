import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SideNavigation } from './index';

describe('SideNavigation', () => {
  test('render a SideNavigation', async () => {
    render(<SideNavigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveClass("juno-sidenavigation");
  });
  
  test("renders children as passed", async () => {
    render(<SideNavigation><button>Test</button></SideNavigation>)
    expect(screen.getByRole('button', {name: "Test"})).toBeInTheDocument();
  })

  test('renders custom classNames as passed', async () => {
    render(<SideNavigation className='my-custom-class' />);
    expect(screen.getByRole("navigation")).toHaveClass('my-custom-class');
  });

  test('renders all props as passed', async () => {
    render(<SideNavigation data-lol='Prop goes here' />);
    expect(screen.getByRole('navigation')).toHaveAttribute('data-lol', 'Prop goes here');
  });
});