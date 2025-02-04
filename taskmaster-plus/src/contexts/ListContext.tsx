"use client";

import React, { createContext, useReducer } from "react";

export type List = {
  id: number;
  title: string;
  visible: boolean;
  tasks: Task[];
  // user to come
};

export type Task = {
  id: number;
  listId: number;
  title: string;
  completed: boolean;
  dueDate?: Date;
  description?: string;
  rrule?: string;
};

export type ListContextType = {
  state: { lists: List[] };
  dispatch: React.Dispatch<ListAction>;
};

export enum ListActions {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

interface ListAction {
  type: ListActions;
  payload: {
    id: number;
    title: string;
    visible: boolean;
    tasks: Task[];
  };
}

interface ListState {
  lists: List[];
}

export const listReducer = (
  state: ListState,
  action: ListAction
): ListState => {
  switch (action.type) {
    case "CREATE":
      return {
        lists: [
          ...state.lists,
          {
            id: action.payload.id,
            title: action.payload.title,
            visible: action.payload.visible,
            tasks: action.payload.tasks
          }
        ]
      };
    case "UPDATE":
      const updatedList = state.lists;
      const targetListIndex = state.lists.findIndex(
        (list) => list.id === action.payload.id
      );

      updatedList[targetListIndex] = action.payload;

      return {
        lists: updatedList
      };
    default:
      return state;
  }
};

const ListContext = createContext<ListContextType>({
  state: { lists: [] },
  dispatch: () => null
});

const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(listReducer, {
    lists: []
  });

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};

export { ListProvider, ListContext };
