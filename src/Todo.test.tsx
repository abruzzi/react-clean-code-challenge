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

  it('add another item todo to list', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some more milk');
    userEvent.type(input, '{enter}')

    expect(screen.getByText('buy some more milk')).toBeInTheDocument();
  })
})