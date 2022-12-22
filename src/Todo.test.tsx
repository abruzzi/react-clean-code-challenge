import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Todo} from "./Todo";

describe('Todo application', () => {
  it('add a todo to list', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some milk');
    userEvent.type(input, '{enter}')

    expect(screen.getByText('buy some milk')).toBeInTheDocument();
  })

  it('clean input after item is added', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some milk');
    userEvent.type(input, '{enter}')

    expect(screen.getByText('buy some milk')).toBeInTheDocument();
    expect(input).toHaveValue('');
  })

  it('mark item as completed', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some milk');
    userEvent.type(input, '{enter}')

    const item = screen.getByText('buy some milk');
    expect(item).toBeInTheDocument();

    userEvent.click(item);
    expect(item).toHaveAttribute('data-completed');
  })

  it('mark the correct item as completed', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some milk');
    userEvent.type(input, '{enter}')

    userEvent.type(input, 'buy some more milk');
    userEvent.type(input, '{enter}')

    const item = screen.getByText('buy some milk');
    expect(item).toBeInTheDocument();

    userEvent.click(item);
    expect(item).toHaveAttribute('data-completed');

    const anotherItem = screen.getByText('buy some more milk');
    expect(anotherItem).toBeInTheDocument();
    expect(anotherItem).not.toHaveAttribute('data-completed');
  })
})