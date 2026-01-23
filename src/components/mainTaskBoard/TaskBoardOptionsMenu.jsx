import BoardOptionsMenu from "../modals/BoardOptionsMenu";
import { useProjects } from "../../context/useProjects";
import BoardPriorityModal from "../modals/BoardPrioritySelector";


export default function TaskBoardOptionsMenu({projectId, task}){
    const { dispatch } = useProjects();

    function handleDelete(taskId) {
    dispatch({
      type: "DELETE_TASK",
      payload: { projectId, taskId },
    });
  }

  // колбэк для каких-то других действий
  function handleInfo(taskId) {
    console.log("Info for task", taskId);
  }

    return(
        <div className="absolute top-1 right-1 bg-[#1c1f22] justify-center items-center border border-white/10 rounded-sm p-1 flex flex-row gap-1">
            <BoardPriorityModal task={task} projectId={projectId}/>

            <BoardOptionsMenu
                task={task}
                onDelete={handleDelete}
                onInfo={handleInfo}
            />
        </div>
    )
}