// projectsReducer.js
import { tasksReducer } from "./tasksReducer";

export function projectsReducer(projects, action) {
  switch (action.type) {
    case "ADD_PROJECT_TO_GROUP":
      return [...projects, { id: Date.now(), name: action.payload.name, tasks: [] }];

    case "DELETE_PROJECT":
      return projects.filter((p) => p.id !== action.payload.projectId);

    case "ADD_TASK":
    case "UPDATE_TASK_PRIORITY":
    case "DELETE_TASK":
    case "UPDATE_TASK_STATUS": // фикс для статуса
    case "UPDATE_TASK_TYPE":
    case "ADD_TASK_COMMENT":
    case "DELETE_TASK_COMMENT":
    case "UPDATE_TASK_DUEDATE":
    case "UPDATE_TASK_DESCRIPTION":
      return projects.map((project) =>
        project.id === action.payload.projectId
          ? { ...project, tasks: tasksReducer(project.tasks, action) }
          : project
      );

    default:
      return projects;
  }
}