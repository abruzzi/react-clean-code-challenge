import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Todo} from "./Todo";
import {TodoType} from "./types";

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

  it('shows agg info for the todo list', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some milk');
    userEvent.type(input, '{enter}')

    userEvent.type(input, 'buy some more milk');
    userEvent.type(input, '{enter}')


    const item = screen.getByText('buy some milk');
    expect(item).toBeInTheDocument();

    userEvent.click(item);


    expect(screen.getByRole('columnheader', {name: /Total/i})).toHaveTextContent("2");
    expect(screen.getByRole('columnheader', {name: /Completed/i})).toHaveTextContent("1");
    expect(screen.getByRole('columnheader', {name: /Active/i})).toHaveTextContent("1");
  })

  it('only show active items when selected', () => {
    render(<Todo />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'buy some milk');
    userEvent.type(input, '{enter}')

    userEvent.type(input, 'buy some more milk');
    userEvent.type(input, '{enter}')


    const item = screen.getByText('buy some milk');
    expect(item).toBeInTheDocument();

    userEvent.click(item);

    const total = screen.getByRole('columnheader', {name: /Total/i});
    expect(total).toHaveTextContent("2");

    const completed = screen.getByRole('columnheader', {name: /Completed/i});
    expect(completed).toHaveTextContent("1");

    const active = screen.getByRole('columnheader', {name: /Active/i});
    expect(active).toHaveTextContent("1");

    userEvent.click(screen.getByTestId('active-count'));
    const todos = screen.getAllByTestId('todo-item-container');
    expect(todos.length).toEqual(1);
  })

  it('renders some tasks if provided', () => {
    const todos: TodoType[] = [
      {
        id: '1',
        content: "buy some milk",
        completed: false
      },
      {
        id: '2',
        content: "buy some orange",
        completed: false
      }
    ];

    render(<Todo todos={todos} />);

    expect(screen.getByText('buy some milk')).toBeInTheDocument();
    expect(screen.getByText('buy some orange')).toBeInTheDocument();
  })
})