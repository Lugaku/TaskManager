import { useState } from "react";
import { useRef } from "react";
import { useProjects } from "../../hooks/useProjects";
import ProjectViewMode from "./viewMode/ProjectsViewMode";
import MyTasks from "./viewMode/MyTasks";

export default function MainSection() {
  const [taskAddModalOpen, setTaskAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const tasksScrollRef = useRef(null);

  const {
  projectGroups,
  selectedProjectId,
  currentView,
  dispatch
} = useProjects();

let project = null;
let group = null;

for (const g of projectGroups) {
  const found = g.projects.find((p) => p.id === selectedProjectId);
  if (found) {
    project = found;
    group = g;
    break;
  }
}

if (currentView === "project") {
  return (
    <ProjectViewMode
      viewMode={viewMode}
      setViewMode={setViewMode}
      group={group}
      project={project}
      tasksScrollRef={tasksScrollRef}
      taskAddModalOpen={taskAddModalOpen}
      setTaskAddModalOpen={setTaskAddModalOpen}
      dispatch={dispatch}
    />
  );
}

if(currentView === "mytask"){
  return(
    <MyTasks group={group}/>
  )
}

return null;
}