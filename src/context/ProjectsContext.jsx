import { createContext, useReducer, useEffect } from "react";
import { rootReducer } from "./reducers/rootReducer";

export const ProjectsContext = createContext();

const defaultState = {
  projectGroups: [],
  selectedProjectId: null,
};

export function ProjectsProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, defaultState, (initial) => {
    const stored = localStorage.getItem("projectsState");
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    localStorage.setItem("projectsState", JSON.stringify(state));
  }, [state]);

  return (
    <ProjectsContext.Provider
      value={{
        projectGroups: state.projectGroups,
        selectedProjectId: state.selectedProjectId,
        dispatch,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}