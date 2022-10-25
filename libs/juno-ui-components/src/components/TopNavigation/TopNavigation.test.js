import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopNavigation } from './index';

describe('TopNavigation', () => {
  test('render a ToppNavigation', async () => {
    render(<TopNavigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveClass("juno-topnavigation");
  });
  
  test("renders children as passed", async () => {
    render(<TopNavigation><button>Test</button></TopNavigation>)
    expect(screen.getByRole('button', {name: "Test"})).toBeInTheDocument();
  })

  test('renders custom classNames as passed', async () => {
    render(<TopNavigation className='my-custom-class' />);
    expect(screen.getByRole("navigation")).toHaveClass('my-custom-class');
  });

  test('renders all props as passed', async () => {
    render(<TopNavigation data-lol='Prop goes here' />);
    expect(screen.getByRole('navigation')).toHaveAttribute('data-lol', 'Prop goes here');
  });
});
