// Should render correctly
// Should show *New task* button when a list is made
// Should show lists in the list view when one is made
// Should be able to toggle list visibility

import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

import Sidebar from "@/components/ui/Sidebar";
import { ListContext, ListContextType } from "@/contexts/ListContext";
import React from "react";

const customRender = (
  ui: React.JSX.Element,
  providerProps: ListContextType
) => {
  return render(
    <ListContext.Provider value={providerProps}>{ui}</ListContext.Provider>
  );
};

describe("Sidebar component", () => {
  const mockSidebar = <Sidebar onNewList={() => {}} onNewTask={() => {}} />;
  const providerProps: ListContextType = {
    state: {
      lists: [
        {
          id: 1,
          title: "Test list",
          visible: true,
          tasks: []
        }
      ]
    },
    dispatch: () => {}
  };

  it("renders correctly", () => {
    const sidebar = render(mockSidebar);

    // no act

    expect(sidebar).toMatchSnapshot();
  });

  it("shows the New Task button when there's at least one list", () => {
    const { container } = customRender(mockSidebar, providerProps);
    const newTaskButton = container.querySelector("button");

    // no act

    expect(newTaskButton).toBeInTheDocument();
  });

  it("shows lists in the list view pane when they're made", () => {
    const { container } = customRender(mockSidebar, providerProps);
    const listViewPane = container.querySelector("aside");
    const listItem = listViewPane?.querySelector("div") as HTMLElement;

    // no act

    expect(listViewPane).toContainElement(listItem);
  });

  it("allows for lists to be toggled", async () => {
    const { container } = customRender(mockSidebar, providerProps);
    const checkbox = container.querySelector("input") as HTMLInputElement;

    // for some odd reason, fireEvent.click(checkbox) doesn't work, so this is used instead.
    // this could be happening because the checkbox's checked prop is tied to state, though i'm not 100% sure
    fireEvent(checkbox, new MouseEvent("click"));

    expect(checkbox).not.toBeChecked();
  });
});
