import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import NewTaskModalForm from "@/components/ui/modals/NewTaskModal/NewTaskModalForm";
import { ListContext, ListContextType } from "@/contexts/ListContext";

const customRender = (
  ui: React.JSX.Element,
  providerProps: ListContextType
) => {
  return render(
    <ListContext.Provider value={providerProps}>{ui}</ListContext.Provider>
  );
};

describe("New task modal form component", () => {
  const mockNewTaskModalForm = (
    <NewTaskModalForm onSubmit={() => {}} onCancel={() => {}} />
  );
  const defaultProps: ListContextType = {
    state: {
      lists: [
        {
          id: 1,
          title: "Test list 1",
          visible: true,
          tasks: []
        },
        {
          id: 2,
          title: "Test list 2",
          visible: true,
          tasks: []
        },
        {
          id: 3,
          title: "Test list 3",
          visible: true,
          tasks: []
        }
      ]
    },
    dispatch: () => {}
  };

  it("renders correctly", () => {
    const newTaskModalForm = render(mockNewTaskModalForm);

    expect(newTaskModalForm).toMatchSnapshot();
  });

  it("displays oldest list as default list option", () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const listDropdown = screen.getByText(/test list 1/i);

    expect(listDropdown).not.toBeNull();
  });

  it("displays correct number of list options", () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const listDropdownOptionElements = screen.getAllByRole("option");

    expect(listDropdownOptionElements.length).toBe(
      defaultProps.state.lists.length
    );
  });

  it("allows user to change list when there are multiple", () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const optionToSelect = defaultProps.state.lists[2].title;

    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: optionToSelect })
    );

    const listDropdown = screen.getByText(/test list 3/i);
    expect(listDropdown).not.toBeNull();
  });

  it("displays an error when no list is selected", () => {
    customRender(mockNewTaskModalForm, {
      state: { lists: [] },
      dispatch: () => {}
    });

    const createTaskButton = screen.getByText(/create new task/i);
    fireEvent.click(createTaskButton);

    const errorText = screen.queryByText(/error: invalid list/i);
    expect(errorText).not.toBeNull();
  });

  it('displays "Task title" placeholder text', () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const taskTitleInput = screen.queryByPlaceholderText(/task title/i);

    expect(taskTitleInput).not.toBeNull();
  });

  it("allows user to enter text into title input", async () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const taskTitleInput = screen.getByPlaceholderText(/task title/i);

    await userEvent.type(taskTitleInput, "lorem ipsum");

    const taskTitle = screen.queryByDisplayValue(/lorem ipsum/i);
    expect(taskTitle).not.toBeNull();
  });

  it("displays an error when no title is specified", async () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const createNewTaskButton = screen.getByText(/create new task/i);

    await userEvent.click(createNewTaskButton);

    const errorText = screen.queryByText(/error: title is required/i);
    expect(errorText).not.toBeNull();
  });

  it("allows user to change due date", () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const taskDueDateInput = document.getElementById(
      "date"
    ) as HTMLInputElement;

    fireEvent.change(taskDueDateInput, { target: { value: "2030-01-01" } });

    expect(taskDueDateInput.value).toMatch(/2030-01-01/i);
  });

  it("allows for task submission without optional values", async () => {
    const mockOnSubmit = jest.fn();
    customRender(mockNewTaskModalForm, defaultProps);
    const taskTitleInput: HTMLInputElement =
      screen.getByPlaceholderText(/task title/i);
    const newTaskModalForm = document.getElementById(
      "new-task-modal-form"
    ) as HTMLFormElement;
    newTaskModalForm.onsubmit = mockOnSubmit();

    await userEvent.type(taskTitleInput, "test task");
    fireEvent.submit(newTaskModalForm);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  // this unit test put me out of the mood to code for about three days...
  // the way i was extracting values from the form - specifically, by using event.target instead of
  // event.currentTarget.elements in the submit handler - led to null values being passed to state,
  // even though it hasn't caused problems in any of the above tests.
  // thus, the rendered error text was the no title one, as the  it's the top one in the file.
  it("doesn't allow user to assign a due date in the past", async () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const taskTitleInput: HTMLInputElement =
      screen.getByPlaceholderText(/task title/i);
    const taskDueDateInput = document.getElementById(
      "date"
    ) as HTMLInputElement;
    const createNewTaskButton = screen.getByText(/create new task/i);

    await userEvent.type(taskTitleInput, "test task");
    fireEvent.change(taskDueDateInput, { target: { value: "2002-05-11" } });
    await userEvent.click(createNewTaskButton);

    const errorText = screen.queryByText(
      /error: due date cannot be in the past./i
    );
    expect(errorText).not.toBeNull();
  });

  it("allows user to change the due time", async () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const taskDueTimeInput = document.getElementById(
      "time"
    ) as HTMLInputElement;

    await userEvent.type(taskDueTimeInput, "09:20", {
      initialSelectionStart: 0,
      initialSelectionEnd: taskDueTimeInput.value.length
    });

    expect(taskDueTimeInput.value).toMatch(/09:20/i);
  });

  it("doesn't allow user to set a due time with a corresponding date", async () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const taskTitleInput: HTMLInputElement =
      screen.getByPlaceholderText(/task title/i);
    const taskDueTimeInput = document.getElementById(
      "time"
    ) as HTMLInputElement;
    const createNewTaskButton = screen.getByText(/create new task/i);

    await userEvent.type(taskTitleInput, "test task");
    await userEvent.type(taskDueTimeInput, "09:20", {
      initialSelectionStart: 0,
      initialSelectionEnd: taskDueTimeInput.value.length
    });
    await userEvent.click(createNewTaskButton);

    const errorText = screen.queryByText(
      /error: time cannot be set without date./i
    );
    expect(errorText).not.toBeNull();
  });

  it("should allow the user to change the description", async () => {
    customRender(mockNewTaskModalForm, defaultProps);
    const taskDescriptionInput: HTMLTextAreaElement =
      screen.getByPlaceholderText(/task description/i);

    await userEvent.type(taskDescriptionInput, "test description");

    expect(taskDescriptionInput.value).toMatch(/test description/i);
  });
});
