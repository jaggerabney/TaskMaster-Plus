// Should render correctly
// Should show *New task* button when a list is made
// Should show lists in the list view when one is made
// Should be able to toggle list visibility

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

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
    customRender(mockSidebar, providerProps);

    // no act

    expect(screen.getByText(/new task/i)).toBeInTheDocument();
  });

  it("shows lists in the list view pane when they're made", () => {
    customRender(mockSidebar, providerProps);
    const listViewPane = document.getElementById("list-view-pane");
    const listItem = document.getElementById(
      providerProps.state.lists[0].id.toString()
    );

    // no act

    expect(listViewPane).toContainElement(listItem);
  });

  it("allows for lists to be toggled", () => {
    customRender(mockSidebar, providerProps);
    const checkbox = document.getElementById(
      providerProps.state.lists[0].id.toString()
    )?.firstChild as Element;

    fireEvent(checkbox, new MouseEvent("click"));

    expect(checkbox).not.toBeChecked();
  });
});
