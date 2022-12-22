import {render, screen, within} from "@testing-library/react";
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

  it('does not add item if the content is empty', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, '{enter}')
    
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
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


  it('click to toggle', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some milk');
    userEvent.type(input, '{enter}')

    const item = screen.getByText('buy some milk');
    expect(item).toBeInTheDocument();

    userEvent.click(item);
    expect(item).toHaveAttribute('data-completed');

    userEvent.click(item);
    expect(item).not.toHaveAttribute('data-completed');
  })

  it('delete item by click the button', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some milk');
    userEvent.type(input, '{enter}')

    const container = screen.getByTestId('todo-item-container')
    const item = within(container).getByText('buy some milk');
    expect(item).toBeInTheDocument();

    const deleteButton = within(container).getByTestId('delete');
    userEvent.click(deleteButton);
    expect(within(container).queryByText('buy some milk')).not.toBeInTheDocument();
  })
})