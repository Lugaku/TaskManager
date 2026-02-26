// tasksReducer.js
export function tasksReducer(tasks, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...tasks,
        {
          id: Date.now(),
          title: action.payload.title,
          description: action.payload.description,
          status: action.payload.status,
          priority: action.payload.priority || "Empty",
          comments: [],
          type: action.payload.type || "Task",
          dueDate: action.payload.dueDate || ""
        },
      ];

    case "UPDATE_TASK_STATUS":
      return tasks.map((t) =>
        t.id === action.payload.taskId ? { ...t, status: action.payload.status } : t
      );

    case "UPDATE_TASK_DESCRIPTION":
      return tasks.map((t) =>
        t.id === action.payload.taskId ? { ...t, description: action.payload.description } : t
    );

    case "UPDATE_TASK_PRIORITY":
      return tasks.map((t) =>
        t.id === action.payload.taskId ? { ...t, priority: action.payload.priority } : t
      )

    case "UPDATE_TASK_TYPE":
      return tasks.map((t) =>
        t.id === action.payload.taskId ? { ...t, type: action.payload.type } : t
      );

       case "ADD_TASK_COMMENT":
        return tasks.map((t) =>
            t.id === action.payload.taskId
            ? {
                ...t,
                comments: [...(t.comments || []), { id: Date.now(), text: action.payload.text }],
                }
            : t
        );

  case "UPDATE_TASK_DUEDATE":
    return tasks.map((t) =>
        t.id === action.payload.taskId
        ? { ...t, dueDate: action.payload.dueDate }
        : t
    );

    // ✅ УДАЛИТЬ КОММЕНТАРИЙ
    case "DELETE_TASK_COMMENT":
        return tasks.map((t) =>
            t.id === action.payload.taskId
            ? {
                ...t,
                comments: (t.comments || []).filter(
                    (c) => c.id !== action.payload.commentId
                ),
                }
            : t
        );

    case "DELETE_TASK":
      return tasks.filter((t) => t.id !== action.payload.taskId);

    default:
      return tasks;
  }
}