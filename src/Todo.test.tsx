import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Todo } from "./Todo";

describe("Todo application", () => {
  it("add a todo to list", () => {
    render(<Todo />);

    const input = screen.getByTestId("todo-input");
    userEvent.type(input, "buy some milk");
    userEvent.type(input, "{enter}");

    expect(screen.getByText("buy some milk")).toBeInTheDocument();
  });

  it("mark an item as completed", () => {
    render(<Todo />);

    const input = screen.getByTestId("todo-input");
    userEvent.type(input, "buy some milk");
    userEvent.type(input, "{enter}");

    const item = screen.getByText("buy some milk");
    expect(item).toBeInTheDocument();

    userEvent.click(item);
    expect(item).toHaveAttribute('data-completed', "true");
  });

  it("toggle active and completed of an item", () => {
    render(<Todo />);

    const input = screen.getByTestId("todo-input");
    userEvent.type(input, "buy some milk");
    userEvent.type(input, "{enter}");

    const item = screen.getByText("buy some milk");
    expect(item).toBeInTheDocument();

    userEvent.click(item);
    expect(item).toHaveAttribute('data-completed', "true");

    userEvent.click(item);
    expect(item).not.toHaveAttribute('data-completed');
  });

  it("deletes an item", () => {
    render(<Todo />);

    const input = screen.getByTestId("todo-input");
    userEvent.type(input, "buy some milk");
    userEvent.type(input, "{enter}");

    const item = screen.getByText("buy some milk");
    expect(item).toBeInTheDocument();

    const button = screen.getByTestId('delete');
    userEvent.click(button)

    expect(screen.queryByText("buy some milk")).not.toBeInTheDocument();
  });

  it('initialise the Todo with data', () => {
    const todos = [
      {
        id: '1',
        content: 'buy some milk',
        completed: false
      },
      {
        id: '2',
        content: 'buy some orange',
        completed: false
      },
      {
        id: '3',
        content: 'coffee coffee',
        completed: true
      },
    ];

    render(<Todo items={todos} />);

    const item = screen.getByText("coffee coffee");
    expect(item).toBeInTheDocument();
  })
});