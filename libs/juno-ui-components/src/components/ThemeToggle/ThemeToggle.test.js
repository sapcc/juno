import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './index';

describe('ThemeToggle', () => {
  
  test('render a theme toggle', async () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass("juno-theme-toggle");
  });
  
  test('render lightMode icon when dark theme is passed', async () => {
    render(<ThemeToggle theme="dark" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("alt", "lightMode")
  })
  
  test('render darkMode icon when dark theme is passed', async () => {
    render(<ThemeToggle theme="light" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("alt", "darkMode")
  })
  
  test("fires a click handler as passed", async () => {
    const onClickSpy = jest.fn();
    render(<ThemeToggle onClick={onClickSpy} />);
    screen.getByRole('button').click();
    expect(onClickSpy).toHaveBeenCalled();	
  })
  
  test("renders a className as passed", async () => {
    render(<ThemeToggle className="my-classname" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveClass("my-classname")
  })
  
  test("renders all props as passed", async () => {
    render(<ThemeToggle data-lolol="123" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute('data-lolol', "123")
  })

});