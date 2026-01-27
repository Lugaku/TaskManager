import { createContext, useReducer, useEffect } from "react";

export const ProjectsContext = createContext();

const defaultState = {
  projectGroups: [],
  selectedProjectId: null,
};

function projectsReducer(state, action) {
  switch (action.type) {
    case "SELECT_PROJECT":
      return { ...state, selectedProjectId: action.payload.projectId };

    case "ADD_GROUP":
      return {
        ...state,
        projectGroups: [
          ...state.projectGroups,
          { id: crypto.randomUUID(), name: action.payload.name, projects: [] },
        ],
      };

    case "ADD_PROJECT_TO_GROUP":
      const newProject = { id: Date.now(), name: action.payload.name, tasks: [] };
      return {
        ...state,
        projectGroups: state.projectGroups.map((g) =>
          g.id === action.payload.groupId ? { ...g, projects: [...g.projects, newProject] } : g
        ),
        selectedProjectId: newProject.id,
      };

    case "ADD_TASK":
      return {
        ...state,
        projectGroups: state.projectGroups.map((group) => ({
          ...group,
          projects: group.projects.map((p) =>
            p.id === action.payload.projectId
              ? { 
                  ...p, 
                  tasks: [
                    ...p.tasks, 
                    { 
                      id: Date.now(), 
                      title: action.payload.title,
                      description: action.payload.description, 
                      status: action.payload.status, 
                      priority: action.payload.priority || "Low" 
                    }
                  ] 
                }
              : p
          ),
        })),
      };

      case "DELETE_GROUP":
        return {
          ...state,
          projectGroups: state.projectGroups.filter((g) => g.id !== action.payload.groupId),
          selectedProjectId:
            state.selectedProjectId &&
            state.projectGroups.find((g) => g.id === state.selectedProjectId)
              ? state.selectedProjectId
              : null,
        };

      case "DELETE_PROJECT":
        return {
          ...state,
          projectGroups: state.projectGroups.map((g) =>
            g.id === action.payload.groupId
              ? {
                  ...g,
                  projects: g.projects.filter((p) => p.id !== action.payload.projectId),
                }
              : g
          ),
          selectedProjectId:
            state.selectedProjectId === action.payload.projectId
              ? null
              : state.selectedProjectId,
        };

      case "DELETE_TASK":
        return {
          ...state,
          projectGroups: state.projectGroups.map((group) => ({
            ...group,
            projects: group.projects.map((p) =>
              p.id === action.payload.projectId
                ? { ...p, tasks: p.tasks.filter((t) => t.id !== action.payload.taskId) }
                : p
            ),
          })),
        };

      case "UPDATE_TASK_STATUS":
        return {
          ...state,
          projectGroups: state.projectGroups.map((group) => ({
            ...group,
            projects: group.projects.map((p) =>
              p.id === action.payload.projectId
                ? {
                    ...p,
                    tasks: p.tasks.map((t) =>
                      t.id === action.payload.taskId ? { ...t, status: action.payload.status } : t
                    ),
                  }
                : p
            ),
          })),
        };ф

        case "UPDATE_TASK_PRIORITY":
          return {
            ...state,
            projectGroups: state.projectGroups.map(group => ({
              ...group,
              projects: group.projects.map(p =>
                p.id === action.payload.projectId
                  ? {
                      ...p,
                      tasks: p.tasks.map(t =>
                        t.id === action.payload.taskId
                          ? { ...t, priority: action.payload.priority }
                          : t
                      ),
                    }
                  : p
              ),
            })),
          };

      case "UPDATE_TASK_COMMENT":
        return {
          ...state,
          projectGroups: state.projectGroups.map((group) => ({
            ...group,
            projects: group.projects.map((p) =>
              p.id === action.payload.projectId
                ? {
                    ...p,
                    tasks: p.tasks.map((t) =>
                      t.id === action.payload.taskId ? { ...t, comment: action.payload.comment } : t
                    ),
                  }
                : p
            ),
          })),
        };

    default:
      return state;
  }
}

export function ProjectsProvider({ children }) {
  const [state, dispatch] = useReducer(projectsReducer, defaultState, (initial) => {
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