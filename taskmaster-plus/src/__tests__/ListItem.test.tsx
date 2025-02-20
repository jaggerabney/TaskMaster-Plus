import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import ListItem from "@/components/ui/ListItem";

describe("List item component", () => {
  const mockListItemProps = {
    id: 1,
    title: "Untitled list",
    tasks: [],
    visible: true,
    onClick: () => {}
  };

  it("renders correctly", () => {
    const listItem = render(<ListItem {...mockListItemProps} />);

    // no act

    expect(listItem).toMatchSnapshot();
  });

  it("is visible when visible = true", () => {
    render(<ListItem {...mockListItemProps} />);
    const listItem = screen.queryByText(mockListItemProps.title);

    // no act

    expect(listItem).not.toBeNull();
  });

  it("isn't visible when visible = false", () => {
    const invisibleListItemProps = {
      ...mockListItemProps,
      visible: false
    };

    render(<ListItem {...invisibleListItemProps} />);
    const listItem = screen.queryByText(mockListItemProps.title, {});

    expect(listItem).toBeNull();
  });

  it('displays the "Create new task" link when there are no tasks', () => {
    render(<ListItem {...mockListItemProps} />);
    const createNewTaskLink = screen.queryByText(/create new task/i);

    expect(createNewTaskLink).not.toBeNull();
  });

  it('hides the "Create new task" link when there are tasks', () => {
    const listItemWithTasksProps = {
      ...mockListItemProps,
      tasks: [
        {
          id: 2,
          listId: 1,
          title: "Test task",
          completed: false,
          dueDate: new Date(2030, 0, 1),
          description: "Test description"
        }
      ]
    };

    render(<ListItem {...listItemWithTasksProps} />);
    const createNewTaskLink = screen.queryByText(/create new task/i);

    expect(createNewTaskLink).toBeNull();
  });
});
