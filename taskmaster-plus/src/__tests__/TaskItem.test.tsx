import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import TaskItem from "@/components/ui/TaskItem";

describe("Task item component", () => {
  const mockTaskItemProps = {
    id: 1,
    listId: 2,
    title: "Test task",
    completed: false
  };

  it("renders correctly", () => {
    const taskItem = render(<TaskItem {...mockTaskItemProps} />);

    expect(taskItem).toMatchSnapshot();
  });

  it("displays task due date", () => {
    const taskItemWithDueDateProps = {
      ...mockTaskItemProps,
      dueDate: new Date(2030, 0, 1)
    };

    render(<TaskItem {...taskItemWithDueDateProps} />);
    const dueDateElement = screen.queryByText(
      taskItemWithDueDateProps.dueDate.toLocaleDateString()
    );

    expect(dueDateElement).not.toBeNull();
  });

  it("displays task due time", () => {
    const taskItemWithDueDateProps = {
      ...mockTaskItemProps,
      dueDate: new Date(2030, 0, 1)
    };

    render(<TaskItem {...taskItemWithDueDateProps} />);
    const dueTimeElement = screen.queryByText(
      taskItemWithDueDateProps.dueDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    );

    expect(dueTimeElement).not.toBeNull();
  });

  it("displays task description", () => {
    const taskItemWithDescriptionProps = {
      ...mockTaskItemProps,
      description: "Lorem ipsum dolor sit amet"
    };

    render(<TaskItem {...taskItemWithDescriptionProps} />);
    const descriptionElement = screen.queryByText(
      /lorem ipsum dolor sit amet/i
    );

    expect(descriptionElement).not.toBeNull();
  });

  it("displays title with strikethrough text when complete", () => {
    const taskItemWithDetailsProps = {
      ...mockTaskItemProps,
      completed: true,
      dueDate: new Date(2030, 0, 1),
      description: "Lorem ipsum dolor sit amet"
    };

    render(<TaskItem {...taskItemWithDetailsProps} />);
    const taskTitleElement = screen.queryByText(/test task/i);

    expect(taskTitleElement).toHaveClass("line-through");
  });

  it("hides task details when complete", () => {
    const taskItemWithDetailsProps = {
      ...mockTaskItemProps,
      completed: true,
      dueDate: new Date(2030, 0, 1),
      description: "Lorem ipsum dolor sit amet"
    };

    render(<TaskItem {...taskItemWithDetailsProps} />);
    const taskDetailsElement = document.getElementById("details-wrapper");

    expect(taskDetailsElement).toBeNull();
  });
});
