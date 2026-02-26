import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import { TASK_STATUSES } from "../../constants/taskStatuses";

const groups = TASK_STATUSES;

export default function TaskBoard({ tasks, onStatusChange, project }) {
  const columns = groups.reduce((acc, group) => {
    acc[group.key] = tasks.filter(t => t.status === group.key);
    return acc;
  }, {});

  function handleDrag(result) {
    if (!result.destination) return;

    const taskId = Number(result.draggableId);
    const newStatus = result.destination.droppableId;

    const current = tasks.find(t => t.id === taskId);
    if (current.status === newStatus) return;

    onStatusChange(taskId, newStatus);
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="w-full h-full overflow-x-auto scroll-container transition">
        <div className="flex flex-row text-white/90 items-start gap-2 h-full flex-nowrap">
          {groups.map(group => (
            <Droppable droppableId={group.key} key={group.key}>
              {(provided) => (
                <TaskColumn
                  project={project}  
                  group={group}
                  tasks={columns[group.key]}
                  provided={provided}
                  className="min-w-[200px] flex-shrink-0"
                />
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}