import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import TaskCreator from "./TaskCreator";
import { IoAddOutline } from "react-icons/io5";
import TaskBoardOptionsMenu from "./TaskBoardOptionsMenu";

export default function TaskColumn({ group, tasks, provided, project}) {
  const [addMode, setAddMode] = useState(false);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  console.log(group)
   

  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={`${group.bgColor} border border-white/10 rounded-md p-1 flex flex-col gap-2 max-w-1/4 w-1/4 flex-shrink-0 max-h-[calc(100vh-10rem)]`}
    >
      {/* HEADER */}
      <div className="flex flex-row justify-between items-center">
        <p className={`${group.color} w-auto flex items-center gap-2 px-3 h-8 rounded-md`}>
          {group.icon}
          {group.title}
        </p>

        <button
          onClick={() => setAddMode(true)}
          className="text-white/40 hover:bg-white/5 rounded-lg p-1 transition"
        >
          <IoAddOutline size={20} />
        </button>
      </div>

      {/* ADD MODE */}
      {addMode && (
        <TaskCreator onClose={() => setAddMode(false)} group={group} projectId={project.id}/>
      )}
        <div className="flex flex-col gap-3 min-h-[10px] overflow-y-auto max-h-[75vh]">
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={String(task.id)} index={index}>
              {(provided, snapshot) => (
               <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
                style={{
                  ...provided.draggableProps.style,
                  transition: snapshot.isDragging
                    ? "transform 0.005s ease, box-shadow 0.005s ease"
                    : "transform 0.01s ease, box-shadow 0.01s ease",
                }}
                className={`
                  transition
                  ${group.blockColor}
                  border 
                  h-25
                  rounded-lg
                  p-3
                  text-white/90 text-base
                  ${snapshot.isDragging ? "shadow-xl scale-105" : "shadow-md scale-100"}
                  ${hoveredTaskId === task.id ? "border-white/30" : "border-white/10"}
                  transition-transform duration-200
                `}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-center">
                    {task.title}

                    {hoveredTaskId === task.id && <TaskBoardOptionsMenu projectId={project.id} task={task} />}
                  </div>

                  {task.comment && (
                    <div className="text-white/30 text-xs">{task.comment}</div>
                  )}
                </div>
              </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}

          {/* Добавить таску */}
          <button
            onClick={() => setAddMode(true)}
            className="text-white/40 flex flex-row gap-1 items-center justify-start p-1 hover:bg-white/5 rounded-lg transition"
          >
            <IoAddOutline size={20} /> Add Task
          </button>

          
        </div>
      
    </div>
  );
}