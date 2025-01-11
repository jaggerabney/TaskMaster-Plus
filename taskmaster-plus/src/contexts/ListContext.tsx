"use client";

import React, { createContext, useReducer } from "react";

export type List = {
  id: number;
  title: string;
  // user to come
  // tasks to come
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
          { id: action.payload.id, title: action.payload.title }
        ]
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
