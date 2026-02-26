import { groupsReducer } from "./groupsReducer";

export function rootReducer(state, action) {
  switch (action.type) {
    case "SELECT_PROJECT":
      return {
        ...state,
        selectedProjectId: action.payload.projectId,
        currentView: "project", // логично сразу переключать
        projectGroups: groupsReducer(state.projectGroups, action),
      };

    case "SET_VIEW":
      return {
        ...state,
        currentView: action.payload.view,
        projectGroups: groupsReducer(state.projectGroups, action),
      };

    default:
      return {
        ...state,
        projectGroups: groupsReducer(state.projectGroups, action),
      };
  }
}