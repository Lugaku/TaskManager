import { groupsReducer } from "./groupsReducer";

export function rootReducer(state, action) {
  return {
    ...state,
    projectGroups: groupsReducer(state.projectGroups, action),
    selectedProjectId:
      action.type === "SELECT_PROJECT"
        ? action.payload.projectId
        : state.selectedProjectId,
  };
}