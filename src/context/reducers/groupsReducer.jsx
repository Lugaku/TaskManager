// groupsReducer.js
import { projectsReducer } from "./projectsReducer";

export function groupsReducer(groups, action) {
  switch (action.type) {
    case "ADD_GROUP":
      return [...groups, { id: Date.now(), name: action.payload.name, projects: [] }];

    case "DELETE_GROUP":
      return groups.filter((g) => g.id !== action.payload.groupId);

    case "ADD_PROJECT_TO_GROUP":
      return groups.map((group) =>
        group.id === action.payload.groupId
          ? { ...group, projects: projectsReducer(group.projects, action) }
          : group
      );

    case "DELETE_PROJECT":
    case "ADD_TASK":
    case "UPDATE_TASK_PRIORITY":
    case "DELETE_TASK":
    case "UPDATE_TASK_STATUS":
    case "UPDATE_TASK_TYPE":
    case "ADD_TASK_COMMENT":
    case "DELETE_TASK_COMMENT":
    case "UPDATE_TASK_DUEDATE":
    case "UPDATE_TASK_DESCRIPTION":
      return groups.map((group) =>
        group.projects.some(p => p.id === action.payload.projectId)
          ? {
              ...group,
              projects: projectsReducer(group.projects, action),
            }
          : group
      );

    default:
      return groups;
  }
}